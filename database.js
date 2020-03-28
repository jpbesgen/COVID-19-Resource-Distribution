// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC7XCt0Yzaiob53UaJHJLzh_Kx5esfp8uA",
    authDomain: "resource19-9fdaa.firebaseapp.com",
    databaseURL: "https://resource19-9fdaa.firebaseio.com",
    projectId: "resource19-9fdaa",
    storageBucket: "resource19-9fdaa.appspot.com",
    messagingSenderId: "103851964611",
    appId: "1:103851964611:web:ecb245ed14e7a168598a76",
    measurementId: "G-FSB5CVSSPV",
    storageBucket: "gs://resource19-9fdaa.appspot.com"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let storageRef = firebase.storage().ref();

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
      designs.forEach(gridItem => {
        console.log(designs);
        // this is where jQuery steps in  
        // var $items = $(
        let description = gridItem.description;
        if (description.length > 140) {
            description = description.substring(0, 141);
            description +=  "...";
        }
        if (gridItem.approved){
            var $items = $(
            `
            <div class="grid-item card ${gridItem.type} ${gridItem.category} certified-${gridItem.certified} printer-${gridItem.printerRequired}" style="width: 18em;">
            <h5 class="card-header text-dark">${gridItem.name}</h5>
                <img class="card-img-top" src="${gridItem.attachments[0]}" alt="Item Attachment 0" />
                <div class="card-body">
                    <p class="card-text"><b>Category:</b> ${gridItem.category}</p>
                    <p class="card-text item-description">${description}</p>
                    <p class="card-text"><b>3D printer Required:</b> ${gridItem.printerRequired}</p>
                    <p class="card-text"><b>Certified:</b> ${gridItem.certified}</p>
                    <button class="btn btn-block card-text" data-toggle="modal" data-target="#${gridItem.id}">See More</button>

                </div>
                <div class="btn-group">
                    <button class="btn">Upvote</button>
                    <button class="btn">Downvote</button> 
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
                    <img class="card-img-top" src="${gridItem.attachments[0]}" alt="Card image cap">
                    <p class="card-text">Category: ${gridItem.category}</p>
                    <p class="card-text">${gridItem.description}</p>
                    <p class="card-text">3D printer Required: ${gridItem.printerRequired}</p>
                    <p class="card-text">Certified: ${gridItem.certified}</p>
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

db.collection("Designs").onSnapshot((querySnapshot) => {
    handleDesigns(querySnapshot).then(renderDesigns);
}, (error) => {
    console.log(error);
});



