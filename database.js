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
let storageRef = firebase.storage();

// TODO:
// Take the array of design data and format into a bootstrap card
// and append each card to the view.
function renderDesigns(designs) {
    console.log(designs)
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



