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
            designCards[gridItem.id] = new DesignCard(design_id, {
                design: gridItem,
            });

            // Create the container for each design to embed in
            var $items = $(
            `
                <div id="${design_id}" class="grid-item card ${gridItem.type} ${gridItem.category} certified-${gridItem.certified} printer-${gridItem.printerRequired}" style="width: 18em;"></div>
            `);
            // append items to grid
            $grid.append( $items )
                .isotope( 'appended', $items );
        });
    };

    fillGrid().then(async () => {
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

        // inject comment view into each
        $('div[id^="commentview-"]').each(async (index, element) => {

            let currentUser = getUser();
            let myProfileUrl =  await getMyProfileUrl();

            // fetch design_id from selector
            let commentView = $(element);
            let design_id = commentView.attr("id");
            design_id = design_id.substr(design_id.indexOf('-') + 1);

            // display comment view
            commentView.comments({
                // functionalities
                enableReplying: false,
                enableEditing: true,
                enableUpvoting: false,
                enableDeleting: true,
                enableDeletingCommentWithReplies: true,
                enableAttachments: false,
                enableHashtags: false,
                enablePinging: false,
                enableNavigation: true,
                postCommentOnEnter: true,
                readOnly: !isAuthenticated(),

                // user data
                profilePictureURL: myProfileUrl,

                // callbacks
                getComments: async function(success, error) {
                    await setTimeout(5000);

                    // fetch comments
                    let comments = await fetchCommentsForDesignById(design_id);
                    let commentsNew = [];

                    if (comments.length > 0){
                        // loop though comments
                        for (const comment of comments){
                            let photoUrl = await getProfileUrl(comment.uid);
                            commentsNew.push({
                                id: comment.id,
                                created: comment.time,
                                modified: comment.modified || comment.time,
                                content: comment.content,
                                fullname: comment.author,
                                created_by_current_user: currentUser ? currentUser.uid === comment.uid : false,
                                profile_picture_url: photoUrl
                            });
                        }
                    }
                    success(commentsNew);
                },
                postComment: async function(commentJSON, success, error) {
                    const {content} = commentJSON;
                    let {err} = await addComment(design_id, content);

                    if (err) {
                        error(err)
                    } else {
                        success(commentJSON);
                    }
                },
                putComment: async function(commentJSON, success, error) {
                    let id = commentJSON.id;
                    let {err} = await editComment(id, commentJSON.content, commentJSON.modified);

                    if (err) {
                        error(err)
                    } else {
                        success(commentJSON);
                    }
                },
                deleteComment: async function(commentJSON, success, error) {
                    let id = commentJSON.id;
                    let {err} = await removeComment(id);

                    if (err) {
                        error(err)
                    } else {
                        success(commentJSON);
                    }
                }
            });
        })
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
                doc.retrievedComments = [];
                res.forEach((r) => {
                    doc.retrievedComments.push(r.data())
                });
                resolve(doc)
            });
        })
    }
    
    let commentFetches = [];
    querySnapshot.forEach((snapshot) => {
        let doc = snapshot.data();
        commentFetches.push(commentFetch(doc))
    });

    return Promise.all(commentFetches)
}

// Retrieves the comments for a specific design "doc"
async function fetchCommentsForDesign(doc) {
    let commentRefs = doc.comments;
    let comments = [];
    if (commentRefs) {
        commentRefs.forEach((ref) => {
            comments.push(db.collection("Comments").doc(ref).get())
        });
    }
    return Promise.all(comments)
}

async function fetchCommentsForDesignById(design_id) {
    // fetch comment ids array
    let designCommentIDs = await new Promise((res, rej) => {
        db.collection("Designs").doc(design_id).get().then((snapshot) => {
            res(
                snapshot.exists && snapshot.data().comments
                    ? snapshot.data().comments
                    : []
            )
        });
    });

    // fetch comment content for each ID
    let finalComments = [];
    for (const commentID of designCommentIDs){
        let result = await new Promise((res, rej) => {
            db.collection("Comments").doc(commentID).get().then(snapshot => {
                res(
                    snapshot.exists
                        ? snapshot.data()
                        : {}
                );
            })
        });

        finalComments.push(result);
    }

    return finalComments
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

async function addComment(design_id, comment_value) {
    if(!isAuthenticated()) {
        alert("Please login to post a comment!");
        return;
    }

    try {
        let comment_id = db.collection("Comments").doc().id;
        let user = getUser();

        // add comment
        await db.collection("Comments").doc(comment_id).set({
            id: comment_id,
            time: Date.now(),
            modified: Date.now(),
            content: comment_value,
            author: user.displayName,
            uid: user.uid,
            design: design_id
        });

        // add to users
        let usersRef = await db.collection("Users").doc(user.uid).get();
        let doc = usersRef.data();
        if (doc.comments == null) {
            doc.comments = [];
        }
        doc.comments.push(comment_id);
        await db.collection("Users").doc(user.uid).set(doc);

        // add to designs
        let designsRef = await db.collection("Designs").doc(design_id).get();
        doc = designsRef.data();
        if (doc.comments == null) {
            doc.comments = [];
        }
        doc.comments.push(comment_id);
        await db.collection("Designs").doc(design_id).set(doc);

        return {}
    } catch (err) {
        return {err}
    }
}

async function removeComment(comment_id) {
    try {
        // set variables
        let commentRef = await db.collection("Comments").doc(comment_id).get();
        let doc = commentRef.data(),
            design_id = doc.design,
            uid = doc.uid;

        // remove from users table
        let usersRef = await db.collection("Users").doc(uid).get();
        let user = usersRef.data();
        for (let i = user.comments.length - 1; i >= 0; i--) {
            if (user.comments[i] === comment_id) {
                user.comments.splice(i, 1);
                break;
            }
        }
        await db.collection("Users").doc(uid).set(user);

        // remove from designs table
        let designsRef = await db.collection("Designs").doc(design_id).get();
        let design = designsRef.data();
        for(let i = design.comments.length - 1; i >= 0; i--) {
            if(design.comments[i] === comment_id) {
                design.comments.splice(i, 1);
                break;
            }
        }
        await db.collection("Designs").doc(design_id).set(design);

        return {}
    } catch (err) {
        return {err}
    }
}

async function editComment(comment_id, newValue, newTimestamp) {
    try {
        let commentRef = await db.collection("Comments").doc(comment_id);
        await commentRef.update({
            content: newValue,
            modified: newTimestamp
        });
        return {};
    } catch (err) {
        return {err};
    }
}

/******************************************************** AUTH *******************************************************/
function isAuthenticated() {
    return auth.user != null || auth.currentUser != null;
}

// Assumes isAuthenticated() == True
function getUser() {
    return auth.user == null ? auth.currentUser : auth.user;
}

async function getMyProfileUrl() {
    let user = getUser();
    return user !== null && user.hasOwnProperty('photoURL')
        ? user.photoURL
        : 'https://viima-app.s3.amazonaws.com/media/public/defaults/user-icon.png'
}

async function getProfileUrl(uid) {
    const defaultUrl = 'https://viima-app.s3.amazonaws.com/media/public/defaults/user-icon.png';

    // get user
    try {
        let userRef = await db.collection("Users").doc(uid).get();
        return userRef.exists && userRef.data().hasOwnProperty('photoUrl') ? userRef.data().photoUrl : defaultUrl;
    } catch (err){
        console.log(err);
        return defaultUrl;
    }
}