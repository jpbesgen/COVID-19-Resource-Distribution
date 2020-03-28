// TODO:
// Take the array of design data and format into a bootstrap card
// and append each card to the view.
function renderDesigns(designs) {
    console.log(designs);
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
        grid.innerHTML = "";
        designs.forEach(gridItem => {
        // this is where jQuery steps in  
        // var $items = $(
        let description = gridItem.description;
        if (description.length > 140) {
            description = description.substring(0, 141);
            description +=  "...";
        }

        // create downloadable links
        let downloads = ``;
        if(gridItem.attachments != null && gridItem.attachments.length > 0) {
            gridItem.attachments.forEach((attachment) => {
                downloads += `<a href="${attachment.url}" target="_blank" download> ${attachment.name}</a>`;
                if(attachment != gridItem.attachments[gridItem.attachments.length - 1]) {
                    downloads += `,`
                }
            });
        }
        
        let links = ``;
        if(gridItem.links != null && gridItem.links.length > 0) {
            gridItem.links.forEach((link) => {
                links += `<a href="${link}" target="_blank"> ${link}</a>`;
                if(link != gridItem.links[gridItem.links.length - 1]) {
                    links += `,`
                }
            })
        }

        let comments = ``,
            { retrievedComments } = gridItem;
        if(retrievedComments != null && retrievedComments.length > 0) {
            retrievedComments.forEach((comment) => {
                comments += `<p class="modal-text" id="${comment.id}-comment">${comment.content} <b>from ${comment.author}</b></p>`;
                if(comment != retrievedComments[retrievedComments.length - 1]) {
                    comments += `<br/>`;
                }
            });
        }

        let addCommentDisplay = 
        `
            <input type="text" placeholder="Write a comment..." id="${gridItem.id}-comment-input"/>
            <small class="form-text text-muted">from ${getUser().displayName}</small>
            <input class="btn" onClick="addComment('${gridItem.id}')" style="border:1px solid black" value="Make a Comment"/>
        `;

        if (gridItem.approved){
            var $items = $(
            `
            <div class="grid-item card ${gridItem.type} ${gridItem.category} certified-${gridItem.certified} printer-${gridItem.printerRequired}" style="width: 18em;">
            <h5 class="card-header text-dark">${gridItem.name}</h5>
                <img class="card-img-top" src="${gridItem.images[0].url}" alt="Item Attachment 0" />
                <div class="card-body">
                    <p class="card-text"><b>Category:</b> ${gridItem.category}</p>
                    <p class="card-text item-description">${description}</p>
                    <p class="card-text"><b>3D printer Required:</b> ${gridItem.printerRequired}</p>
                    <p class="card-text"><b>Certified:</b> ${gridItem.certified}</p>
                    <button class="btn btn-block card-text" data-toggle="modal" data-target="#${gridItem.id}">See More</button>

                </div>
                <div class="btn-group">
                    <button onClick="upvote('${gridItem.id}')" class="btn">Upvote</button>
                    <button onClick="downvote('${gridItem.id}')" class="btn">Downvote</button> 
                </div>               
            </div>

           <div class="modal fade" id="${gridItem.id}" tabindex="-1" role="dialog" aria-labelledby="${gridItem.id}ModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="${gridItem.id}ModalLabel">${gridItem.name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-xs-12 col-6">
                                <img class="modal-img" src="${gridItem.images[0].url}" alt="Modal item cap" />
                            </div>
                            <div class="col-xs-12 col-6">
                                <div class="community">
                                    <div class="votes">
                                        <h3 class="community-title">Community Score</h3>
                                        <p class="community-text">${gridItem.upvotes} Upvotes</p>
                                    </div>
                                    <div class="comments">
                                        <h3 class="community-title">Comments</h3>
                                        <p class="community-text">${comments}</p>
                                        ${getUser() == null ? "" : addCommentDisplay}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p class="modal-text"><b>Category</b><br />${gridItem.category}</p>
                        <p class="modal-text"><b>Description</b><br />${gridItem.description}</p>
                        <p class="modal-text"><b>3D Printer Required</b><br />${gridItem.printerRequired}</p>
                        <p class="modal-text"><b>Certified</b><br /> ${gridItem.certified}</p>
                        <p class="modal-text"><b>Difficulty Level</b><br /> ${gridItem.difficulty}</p>
                        <p class="modal-text"><b>Credit</b><br /> ${gridItem.credit}</p>
                        Links: ${links}
                        Attachments: ${downloads}
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
                </div>
            </div>
            `
            );
            console.log($items);
            // append items to grid
            $grid.append( $items )
                .isotope( 'appended', $items );
        }
        })
    }
    fillGrid()
  })
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