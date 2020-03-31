let designCards = {},
    latestSnapshot = null,
    initialRendered = false;

// TODO:
// Take the array of design data and format into a bootstrap card
// and append each card to the view.
function renderDesigns(designs) {
    EventStore.publish("Designs", {designs});
    $(document).ready(() => {

    const $grid = $('#grid').isotope({
      itemSelector: '.grid-item',
      percentPosition: true,
      masonry: {
        columnWidth: 30
      }
    });

    $('.dropdown-menu').on( 'click', 'button', function() {
      const filterValue = $( this ).attr('data-filter');
      console.log(filterValue);
      console.log($grid);
      // use filterFn if matches value
      // filterValue = filterFns[ filterValue ] || filterValue;
      $grid.isotope({ filter: filterValue });
    });

    fillGrid = async () => {
        let grid = document.getElementById("grid");
        if(grid == null) return;
        designs.forEach(gridItem => {
            if(designCards[gridItem.id] != null) {
                EventStore.publish("DesignCardChange-" + gridItem.id, {
                    design: gridItem
                });
                return;
            }
            let design_id = "design-" + gridItem.id;
            let newDesign = new DesignCard(design_id, {
                design: gridItem,
            });
            designCards[gridItem.id] = newDesign;

            // Create the container for each design to embed in
            var $items = $(
            `
                <div id="${design_id}" class="grid-item card ${gridItem.type} ${gridItem.category} certified-${gridItem.certified} printer-${gridItem.printerRequired}" style="width: 18em;">
                
                </div>
            `);
            // append items to grid
            // $grid.append( $items )
                // .isotope( 'appended', $items );


            $grid.append( $items )
                .isotope( 'appended', $items );
        });
    }

    fillGrid().then(() => {
        ComponentTree.renderAll().then(() => {
            if(!initialRendered) {
                handleDesigns(latestSnapshot).then(renderDesigns);
            }
            initialRendered = true;
        });
        // enable carousel
        $(".owl-carousel").owlCarousel({
            items: 1,
            margin: 10,
            autoHeight: true,
            nav: true,
            loop: true,
            lazyLoadEager: 1,
            lazyLoad: false,
            autoplayHoverPause: true,
            navText: "<>",
            autoplay: true,
            autoplayTimeout: 5000,
        });

    });
  });
}

// handleDesigns
//      * retrieves designs and comments
// parameters
//      * querysnapshot: firebase object containing array of design "docs"
// returns
//      * array of designs with all retrieved comments
async function handleDesigns(querySnapshot) {

    function commentFetch(doc) {
        return new Promise((resolve, reject) => {
            fetchCommentsForDesign(doc).then((res) => {
                doc.retrievedComments = []
                res.forEach((r) => {
                    doc.retrievedComments.push(r.data())
                })
                resolve(doc)
            });
        })
    }
    
    let commentFetches = []
    querySnapshot.forEach((snapshot) => {
        let doc = snapshot.data()
        commentFetches.push(commentFetch(doc))
    })

    return Promise.all(commentFetches)
}

// Retrieves the comments for a specific design "doc"
async function fetchCommentsForDesign(doc) {
    let commentRefs = doc.comments
    let comments = []
    if(commentRefs != undefined && commentRefs != null) {
        commentRefs.forEach((ref) => {
            comments.push(db.collection("Comments").doc(ref).get())
        });
    }
    return Promise.all(comments)
}


// Creates a listener that updates the designs whenever there is a change
function listenForDesigns() {
    db.collection("Designs").onSnapshot((querySnapshot) => {
        latestSnapshot = querySnapshot;
        handleDesigns(querySnapshot).then(renderDesigns);
    }, (error) => {
        console.log(error);
    });
}

if(document.getElementById("grid") != null) {
    listenForDesigns();
}

function upvote(design_id) {
    if(!isAuthenticated()) {
        alert("Please login to vote on submissions!");
        return;
    }
    db.collection("Designs").doc(design_id).get().then((snapshot) => {
        let doc = snapshot.data();
        doc.upvotes += 1;
        db.collection("Designs").doc(design_id).set(doc);
    });
}

function downvote(design_id) {
    if(!isAuthenticated()) {
        alert("Please login to vote on submissions!");
        return;
    }
    db.collection("Designs").doc(design_id).get().then((snapshot) => {
        let doc = snapshot.data();
        doc.upvotes = (doc.upvotes-1) > 0 ? doc.upvotes - 1 : 0;
        db.collection("Designs").doc(design_id).set(doc);
    });
}

function addComment(design_id) {
    if(!isAuthenticated()) {
        alert("Please login to post a comment!");
        return;
    }
    let comment_value = document.getElementById(design_id + "-comment-input").value;
    let comment_id = db.collection("Comments").doc().id;

    let user = getUser();
    db.collection("Comments").doc(comment_id).set({
        content: comment_value,
        author: user.displayName,
        uid: user.uid,
        id: comment_id,
        design: design_id,
        time: Date.now()
    });

    db.collection("Users").doc(user.uid).get().then((snapshot) => {
        let doc = snapshot.data();
        if(doc.comments == null) {
            doc.comments = [];
        }
        doc.comments.push(comment_id);
        db.collection("Users").doc(user.uid).set(doc);
    });

    db.collection("Designs").doc(design_id).get().then((snapshot) => {
        let doc = snapshot.data();
        if(doc.comments == null) {
            doc.comments = [];
        }
        doc.comments.push(comment_id);
        db.collection("Designs").doc(design_id).set(doc);
    });
}

function removeComment(comment_id) {
    db.collection("Comments").doc(comment_id).get().then((snapshot) => {
        let doc = snapshot.data(),
            design_id = doc.design,
            uid = doc.uid;
        
        db.collection("Users").doc(uid).get().then((user) => {
            user = user.data();
            for(let i = user.comments.length - 1; i >= 0; i--) {
                if(user.comments[i] == comment_id) {
                    user.comments.splice(i, 1);
                    break;
                }
            }
            db.collection("Users").doc(uid).set(user);
        });

        db.collection("Designs").doc(design_id).get().then((design) => {
            design = design.data();
            for(let i = design.comments.length - 1; i >= 0; i--) {
                if(design.comments[i] == comment_id) {
                    design.comments.splice(i, 1);
                    break;
                }
            }
            db.collection("Designs").doc(design_id).set(design);
        });
    });
}

function isAuthenticated() {
    return auth.user != null || auth.currentUser != null;
}

// Assumes isAuthenticated() == True
function getUser() {
    return auth.user == null ? auth.currentUser : auth.user;
}

/*



*/