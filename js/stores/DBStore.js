class DatabaseStore {
    constructor() {
        this.designs = [];

        console.log("creating dbstore");
    }

    renderDesigns(designs) {
        this.designs = designs;
        

    }

    handleDesignsChange(querySnapshot) {
        function commentFetch(doc) {
            return new Promise((resolve, reject) => {
                this.fetchCommentsForDesign(doc).then((res) => {
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

        Promise.all(commentFetches).then((designs) => this.renderDesigns(designs));
    }

    async fetchCommentsForDesign(doc) {
        let commentRefs = doc.comments
        let comments = []
        if(commentRefs != undefined && commentRefs != null) {
            commentRefs.forEach((ref) => {
                comments.push(db.collection("Comments").doc(ref).get())
            });
        }
        return Promise.all(comments)
    }

    listenForDesignsChange() {
        db.collection("Designs").onSnapshot((querySnapshot) => {
            EventStore.publish("DesignsChange", querySnapshot);
        }, (error) => {
            console.log(error);
        });
    }


    removeComment(comment_id) {
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


    getUser() {
        return auth.user == null ? auth.currentUser : auth.user;
    }

    isAuthenticated() {
        return auth.user != null || auth.currentUser != null;
    }
     
}

let DBStore = new DatabaseStore();

// Whenever the designs are 
DBStore.handleDesignsChange = DBStore.handleDesignsChange.bind(DBStore);
EventStore.on("DesignsChange", DBStore.handleDesigns);

// class DBStore {
//     constructor() {
//         super();
//     }





// function upvote(design_id) {
//     if(!isAuthenticated()) {
//         alert("Please login to vote on submissions!");
//         return;
//     }
//     db.collection("Designs").doc(design_id).get().then((snapshot) => {
//         let doc = snapshot.data();
//         doc.upvotes += 1;
//         db.collection("Designs").doc(design_id).set(doc);
//     });
// }

// function downvote(design_id) {
//     if(!isAuthenticated()) {
//         alert("Please login to vote on submissions!");
//         return;
//     }
//     db.collection("Designs").doc(design_id).get().then((snapshot) => {
//         let doc = snapshot.data();
//         doc.upvotes = (doc.upvotes-1) > 0 ? doc.upvotes - 1 : 0;
//         db.collection("Designs").doc(design_id).set(doc);
//     });
// }

// function addComment(design_id) {
//     if(!isAuthenticated()) {
//         alert("Please login to post a comment!");
//         return;
//     }
//     let comment_value = document.getElementById(design_id + "-comment-input").value;
//     let comment_id = db.collection("Comments").doc().id;

//     let user = getUser();
//     db.collection("Comments").doc(comment_id).set({
//         content: comment_value,
//         author: user.displayName,
//         uid: user.uid,
//         id: comment_id,
//         design: design_id,
//         time: Date.now()
//     });

//     db.collection("Users").doc(user.uid).get().then((snapshot) => {
//         let doc = snapshot.data();
//         if(doc.comments == null) {
//             doc.comments = [];
//         }
//         doc.comments.push(comment_id);
//         db.collection("Users").doc(user.uid).set(doc);
//     });

//     db.collection("Designs").doc(design_id).get().then((snapshot) => {
//         let doc = snapshot.data();
//         if(doc.comments == null) {
//             doc.comments = [];
//         }
//         doc.comments.push(comment_id);
//         db.collection("Designs").doc(design_id).set(doc);
//     });
// }

// function removeComment(comment_id) {
//     db.collection("Comments").doc(comment_id).get().then((snapshot) => {
//         let doc = snapshot.data(),
//             design_id = doc.design,
//             uid = doc.uid;
        
//         db.collection("Users").doc(uid).get().then((user) => {
//             user = user.data();
//             for(let i = user.comments.length - 1; i >= 0; i--) {
//                 if(user.comments[i] == comment_id) {
//                     user.comments.splice(i, 1);
//                     break;
//                 }
//             }
//             db.collection("Users").doc(uid).set(user);
//         });

//         db.collection("Designs").doc(design_id).get().then((design) => {
//             design = design.data();
//             for(let i = design.comments.length - 1; i >= 0; i--) {
//                 if(design.comments[i] == comment_id) {
//                     design.comments.splice(i, 1);
//                     break;
//                 }
//             }
//             db.collection("Designs").doc(design_id).set(design);
//         });
//     });
// }

