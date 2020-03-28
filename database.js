let db = firebase.firestore();
let storageRef = firebase.storage().ref();

// TODO:
// Take the array of design data and format into a bootstrap card
// and append each card to the view.
function renderDesigns(designs) {
    console.log(designs);
    $(document).ready(() => {

    // const $grid = $('#grid').isotope({
    //   itemSelector: '.grid-item'
    // });

    // $('.filters-button-group').on( 'click', 'button', function() {
    //   const filterValue = $( this ).attr('data-filter');
    //   console.log(filterValue);
    //   console.log($grid);
    //   // use filterFn if matches value
    //   // filterValue = filterFns[ filterValue ] || filterValue;
    //   $grid.isotope({ filter: filterValue });
    // });

    fillGrid = async () => {
      designs.forEach(gridItem => {
        console.log(designs);
        // this is where jQuery steps in  
        // var $items = $(
        let description = gridItem.description;
        if (description.length > 55) {
            description = description.substring(0, 56);
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

        if (gridItem.approved){
            $('#grid').append(
            `
            <div class="card ${gridItem.type} ${gridItem.category} grid-item">
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
                <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="${gridItem.id}ModalLabel">${gridItem.name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <img class="card-img-top" src="${gridItem.images[0].url}" alt="Card image cap">
                        <p class="card-text">Category: ${gridItem.category}</p>
                        <p class="card-text">${gridItem.description}</p>
                        <p class="card-text">3D printer Required: ${gridItem.printerRequired}</p>
                        <p class="card-text">Certified: ${gridItem.certified}</p>
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
            // append items to grid
            // $grid.append( $items )
                // .isotope( 'appended', $items );
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
listenForDesigns();

function upvote(design_id) {
    console.log(design_id)
    db.collection("Designs").doc(design_id).get().then((snapshot) => {
        let doc = snapshot.data();
        doc.upvotes += 1;
        db.collection("Designs").doc(design_id).set(doc);
    });
}

function downvote(design_id) {
    db.collection("Designs").doc(design_id).get().then((snapshot) => {
        let doc = snapshot.data();
        doc.upvotes = (doc.upvotes-1) > 0 ? doc.upvotes - 1 : 0;
        db.collection("Designs").doc(design_id).set(doc);
    });
}

function addComment(design_id) {

}