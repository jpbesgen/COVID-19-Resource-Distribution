class DatabaseStore {
    constructor() {
        this.designs = [];
        this.designCollectionSnapshot = null;

        // handlers
        this.emitDesignsChange = this.emitDesignsChange.bind(this);
        this.handleDesignsChange = this.handleDesignsChange.bind(this);

        // api
        this.fetchCommentsForDesign = this.fetchCommentsForDesign.bind(this);
        this.fetchCommentsForDesignById = this.fetchCommentsForDesignById.bind(this);
        this.listenForDesignsChange = this.listenForDesignsChange.bind(this);
        this.addComment = this.addComment.bind(this);
        this.editComment = this.editComment.bind(this);
        this.removeComment = this.removeComment.bind(this);
        this.handleUpvote = this.handleUpvote.bind(this);
        this.handleDownvote = this.handleDownvote.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.uploadDesign = this.uploadDesign.bind(this);
        this.userHasUpvotedComment = this.userHasUpvotedComment.bind(this);
        this.addCommentUpvote = this.addCommentUpvote.bind(this);
        this.removeCommentUpvote = this.removeCommentUpvote.bind(this);

        // users
        this.getDBUser = this.getDBUser.bind(this);
        this.getAuthUser = this.getAuthUser.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.handleUserAuthenticated = this.handleUserAuthenticated.bind(this);
        this.getMyProfileUrl = this.getMyProfileUrl.bind(this);
        this.getProfileUrl = this.getProfileUrl.bind(this);
    }

    async uploadDesign(design) {
        if(this.isAuthenticated()) {
            let { displayName, uid } = this.getAuthUser();
            design["user"] = displayName;
            design["uid"] = uid;
        } else {
            design["user"] = "Anonymous";
            design["uid"] = null;
        }

        let design_ref = db.collection("Designs").doc().id;
        design["id"] = design_ref;
        return db.collection("Designs").doc(design_ref).set(design);
    }

    async uploadFile(file, path) {
        return new Promise((resolve, reject) => {
            let filePut = storageRef.child(path + file.name).put(file);
            filePut.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.log(error);
                reject("Failure to upload " + file.name);
            },
            () => {
                filePut.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('File available at', downloadURL);
                    resolve({
                        name: file.name,
                        url: downloadURL
                    });
                });
            });
        })
    }

    handleUserAuthenticated(authResult) {
        let { user } = authResult;
        db.collection("Users").doc(user.uid).get().then((snapshot) => {
            let doc = snapshot.data();
            if(doc == null || doc.uid == null) {
                db.collection("Users").doc(user.uid).set({
                    name: user.displayName,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    phone: user.phoneNumber,
                    uid: user.uid,
                    photoUrl: user.photoURL,
                    lastLogin: Date.now(),
                    comments: [],
                    designs: [],
                    upvoteCount: 0,
                    upvotedComments: [],
                }).then(() => {
                    location.assign("/index.html");
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                location.assign("/index.html");
            }
        });
    }

    /*
        Parameters: none
        Returns: none
        Actions:
            * Publishes a "DesignChange" event with the designs object array
        Assumes: none
    */
    emitDesignsChange() {
        EventStore.publish("DesignsChange", this.designs);
    }

    getDesigns() {
        return this.designs;
    }
  
    /*
        Parameters:
            * querySnapshot = Firestore object containing .data() for all designs
        Returns: none
        Actions:
            * Fetches comments for designs, appends them, and calls emitDesignsChange
        Assumes: none
    */
    handleDesignsChange(querySnapshot) {
        let commentFetches = [];
        querySnapshot.forEach((snapshot) => {
            let doc = snapshot.data();
            commentFetches.push(new Promise((resolve, reject) => {
                this.fetchCommentsForDesign(doc).then((res) => {
                    doc.retrievedComments = []
                    res.forEach((r) => {
                        doc.retrievedComments.push(r.data());
                    })
                    resolve(doc);
                });
            }));
        });

        Promise.all(commentFetches).then((designs) => {
            this.designs = designs;
            this.emitDesignsChange()
        });
    }

    /*
        Parameters:
            * doc = Design object for which to fetch comments from its list of references
        Returns:
            * A Promise whose resolution returns the list of Comment objects for this Design (not references)
        Actions: none
        Assumes: none
    */
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

    /*
        Parameters:
            * design_id = ID of a design for which to fetch the comments
        Returns:
            * A Promise whose resolution returns the list of Comment objects for this Design (not references)
        Actions: none
        Assumes: none
    */
    async fetchCommentsForDesignById(design_id) {
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

    /*
        Parameters: none
        Returns: none
        Actions:
            * Creates an active listener on the Designs collection.
            * Emits a "DesignsChange" event everytime the listener is triggered
            * and pushes the Firebase Query Snapshot to the event store.
        Assumes: Firebase Firestore is enabled

    */
    listenForDesignsChange() {
        db.collection("Designs").onSnapshot((querySnapshot) => {
            this.designCollectionSnapshot = querySnapshot;
            this.handleDesignsChange(querySnapshot);
        }, (error) => {
            console.error(error);
        });
    }

    /*
        Parameters:
            * design_id = ID reference of the design where this comment is being made
        Returns: none
        Actions:
            * Creates a Comment object in the database and creates references to this object
            * under the Design and User objects corresponding to where the comment came from
            * and who wrote it, respectively.
        Assumes: design_id is a valid reference to a Design object
    */
    async addComment(design_id, comment_value) {
        // Check if the user is authenticated, if not throw an error
        if(!this.isAuthenticated()) throw new Error("Please login before making a comment!");

        try {
            // Creates a new id for the comment
            let comment_id = db.collection("Comments").doc().id;

            // Get a reference to the current user from auth
            let user = this.getAuthUser();

            // Set the data for the comment in the Comments collection
            // This document contains all data about this comment,
            // Other documents merely reference this through the comment_id
            /*
                Comment {
                    content: STRING,    // What's said
                    author: STRING,     // Name of who said it
                    uid: STRING,        // ID of who said it (for database purposes)
                    id: STRING,         // ID of the comment, how it is referenced everywhere
                    design: STRING,     // ID of the design the comment is located, for DB referencing
                    time: NUMBER        // Time in milliseconds that this comment was made
                }

                // Possible other attributes:
                    numLikes: NUMBER    // Number of people who liked this comment
                    threadId: STRING    // ID of the Thread reference for this comment
                                        // Thread may be its own collection and data structure

            */
            await db.collection("Comments").doc(comment_id).set({
                id: comment_id,
                time: Date.now(),
                modified: Date.now(),
                content: comment_value,
                author: user.displayName,
                uid: user.uid,
                design: design_id,
                upvoteCount: 0,
            });


            // Access the User object for who posted the comment in the database
            // First: retrieve the full User object using .get() and snapshot.data()
            // Second: append the new comment reference to the list of the User's comments
            // Third: push the newly updated User object back to the database .set()
            let usersRef = await db.collection("Users").doc(user.uid).get();
            let doc = usersRef.data();
            if (doc.comments == null) {
                doc.comments = [];
            }
            doc.comments.push(comment_id);
            db.collection("Users").doc(user.uid).set(doc);

            // Access the Design object where the comment was posted in the database
            // First: retrieve the full Design object using .get() and snapshot.data()
            // Second: append the new comment reference to the list of the Design's comments
            // Third: push the newly updated Design object back to the database .set()
            let designsRef = await db.collection("Designs").doc(design_id).get();
            doc = designsRef.data();
            if(doc.comments == null) {
                doc.comments = [];
            }
            doc.comments.push(comment_id);
            await db.collection("Designs").doc(design_id).set(doc);

            return {}
        } catch (err) {
            console.error(err);
            return {err}
        }
    }

    /*
        Parameters:
            * comment_id = ID reference to the Comment object in the database
            * newValue = new comment text
            * newTimestamp = timestamp to be used for when the comment was 'modified'
        Returns: none
        Actions:
            * Edits the comment text and timestamp in the database.
        Assumes: none
    */
    async editComment(comment_id, newValue, newTimestamp) {
        try {
            let commentRef = await db.collection("Comments").doc(comment_id);
            await commentRef.update({
                content: newValue,
                modified: newTimestamp
            });
            return {};
        } catch (err) {
            console.error(err);
            return {err};
        }
    }

    /*
        Parameters:
            * comment_id = ID reference to the Comment object in the database
        Returns: none
        Actions:
            * Removes the comment reference from the corresponding User and Design objects
            * in the database, effectively deleting it from display.
        Assumes: none
    */
    async removeComment(comment_id) {
        // Check if the user is authenticated, if not throw an error
        if(!this.isAuthenticated()) throw new Error("Please login to remove your comments!");

        try {
            // Access the Comment object in the databse using the comment_id
            // First: Get references to the Design and User objects in the database
            // Second: Remove the comment reference from the list under the User object
            // Third: Remove the comment reference from the list under the Design object
            // Fourth?: TODO: We could delete this Comment object in the db or save it.
            let commentsRef = await db.collection("Comments").doc(comment_id).get();
            let doc = commentsRef.data(),
                design_id = doc.design, // Reference to Design object
                uid = doc.uid;          // Reference to User object

            // remove from users
            let usersRef = await db.collection("Users").doc(uid).get();
            let user = usersRef.data();
            for (let i = user.comments.length - 1; i >= 0; i--) {
                if (user.comments[i] === comment_id) {
                    user.comments.splice(i, 1); // Removes the reference
                    break;
                }
            }
            await db.collection("Users").doc(uid).set(user); // Updates the User object

            // remove from designs
            let designsRef = await db.collection("Designs").doc(design_id).get();
            let design = designsRef.data();
            for (let i = design.comments.length - 1; i >= 0; i--) {
                if (design.comments[i] === comment_id) {
                    design.comments.splice(i, 1);   // Removes the reference
                    break;
                }
            }
            await db.collection("Designs").doc(design_id).set(design);    // Updates Design object

            return {}
        } catch (err) {
            console.error(err);
            return {err}
        }
    }

    handleUpvote(design_id) {
        if(!this.isAuthenticated()) {
            alert("Please login to vote on submissions!");
            return;
        }
        let user = this.getAuthUser();
        var increment = 1;
        db.collection("Users").doc(user.uid).get().then((snapshot) => {
            let doc = snapshot.data();
            if(doc.upvotes == null) {
                doc.upvotes = [];
            }
            // check if user has already downvoted this design
            if(doc.downvotes != null && doc.downvotes.includes(design_id)) {
              // remove design from downvotes
              while(doc.downvotes.includes(design_id)) {
                const index = doc.downvotes.indexOf(design_id);
                if (index > -1) {
                  doc.downvotes.splice(index, 1);
                }
              }
              increment += 1;
            } else if(doc.upvotes != null && doc.upvotes.includes(design_id)) {
              alert("You cannot upvote a design more than once!");
              return;
            }
            doc.upvotes.push(design_id);
            db.collection("Users").doc(user.uid).set(doc);
            db.collection("Designs").doc(design_id).get().then((snapshot) => {
                let doc = snapshot.data();
                doc.upvotes += increment;
                db.collection("Designs").doc(design_id).set(doc);
            });
        });
    }

    handleDownvote(design_id) {
        if(!this.isAuthenticated()) {
            alert("Please login to vote on submissions!");
            return;
        }
        let user = this.getAuthUser();
        var increment = 1;
        db.collection("Users").doc(user.uid).get().then((snapshot) => {
            let doc = snapshot.data();
            if(doc.downvotes == null) {
                doc.downvotes = [];
            }
            // check if user has already upvoted this design
            if(doc.upvotes != null && doc.upvotes.includes(design_id)) {
              // remove from downvotes and then upvote
              while(doc.upvotes.includes(design_id)) {
                const index = doc.upvotes.indexOf(design_id);
                if (index > -1) {
                  doc.upvotes.splice(index, 1);
                }
              }
              increment += 1
            }
            if(doc.downvotes != null && doc.downvotes.includes(design_id)) {
              alert("You cannot downvote a design more than once!");
              return;
            }
            doc.downvotes.push(design_id);
            db.collection("Users").doc(user.uid).set(doc);
            db.collection("Designs").doc(design_id).get().then((snapshot) => {
                let doc = snapshot.data();
                doc.upvotes = (doc.upvotes-increment) > 0 ? doc.upvotes - increment : 0;
                db.collection("Designs").doc(design_id).set(doc);
            });
        });
    }

    async userHasUpvotedComment(user_id, comment_id) {
        try {
            if (!user_id) {
                throw 'User ID not supplied'
            }
            if (!comment_id) {
                throw 'Comment ID not supplied'
            }

            // fetch user
            let userRef = await db.collection("Users").doc(user_id).get();
            let user = userRef.exists ? userRef.data() : null;
            if (!user) return false;

            // fetch upvotes array
            let upvotedList = user.upvotedComments;
            if (!upvotedList) return false;

            // check if comment id is in upvoted list
            return upvotedList.includes(comment_id);

        } catch (err) {
            console.error(err);
            return false;
        }
    }

    async addCommentUpvote(user_id, comment_id) {
        try {
            if (!user_id) {
                throw 'User ID not supplied'
            }
            if (!comment_id) {
                throw 'Comment ID not supplied'
            }

            // fetch comment
            let commentRef = await db.collection("Comments").doc(comment_id).get();
            let comment = commentRef.exists ? commentRef.data() : null;
            if (!comment) throw 'Comment does not exist';

            // increment upvote count
            await db.collection("Comments").doc(comment_id).update({
                upvoteCount: comment.upvoteCount + 1,
            });

            // fetch user
            let userRef = await db.collection("Users").doc(user_id).get();
            let user = userRef.exists ? userRef.data() : null;
            if (!user) throw 'User does not exist';

            // add comment ID to user's likes
            let upvotedList = user.upvotedComments || [];
            upvotedList.push(comment_id);
            await db.collection("Users").doc(user_id).update({
                upvotedComments: upvotedList
            });

            return {};

        } catch (err) {
            console.error(err);
            return {err};
        }
    }

    async removeCommentUpvote(user_id, comment_id) {
        try {
            if (!user_id) {
                throw 'User ID not supplied'
            }
            if (!comment_id) {
                throw 'Comment ID not supplied'
            }

            // fetch comment
            let commentRef = await db.collection("Comments").doc(comment_id).get();
            let comment = commentRef.exists ? commentRef.data() : null;
            if (!comment) throw 'Comment does not exist';

            // decrement upvote count
            await db.collection("Comments").doc(comment_id).update({
                upvoteCount: Math.max(comment.upvoteCount - 1, 0),
            });

            // fetch user
            let userRef = await db.collection("Users").doc(user_id).get();
            let user = userRef.exists ? userRef.data() : null;
            if (!user) throw 'User does not exist';

            // remove comment ID from user's likes
            let upvotedList = user.upvotedComments;
            if (!upvotedList) return {};
            let indexOfComment = upvotedList.indexOf(comment_id);
            if (indexOfComment < 0) return {};
            upvotedList.splice(
                indexOfComment,
                1
            );
            await db.collection("Users").doc(user_id).update({
                upvotedComments: upvotedList
            });

            return {};

        } catch (err) {
            console.error(err);
            return {err};
        }
    }

    /*
        Parameters: none
        Returns: The authenticated user object
        Actions: none
        Assumes: this.isAuthenticated() == true
    */
    getAuthUser() {
        return auth.user == null ? auth.currentUser : auth.user;
    }

    /*
        Parameters: none
        Returns: The authenticated user's profile URL
        Actions: none
        Assumes: this.isAuthenticated() == true
    */
    getMyProfileUrl() {
        let user = this.getAuthUser();
        return user !== null && user.hasOwnProperty('photoURL')
            ? user.photoURL
            : 'https://viima-app.s3.amazonaws.com/media/public/defaults/user-icon.png'
    }

    /*
        Parameters: uid for a user's profile URL
        Returns: The user's profile URL
        Actions: none
        Assumes: none
    */
    async getProfileUrl(uid) {
        const defaultUrl = 'https://viima-app.s3.amazonaws.com/media/public/defaults/user-icon.png';

        // get user
        try {
            let userRef = await db.collection("Users").doc(uid).get();
            return userRef.exists && userRef.data().hasOwnProperty('photoUrl') ? userRef.data().photoUrl : defaultUrl;
        } catch (err){
            console.error(err);
            return defaultUrl;
        }
    }

    /*
        Parameters: none
        Returns: The database User object of whoever is authenticated
        Actions: none
        Assumes: this.isAuthenticated() == true
    */
    getDBUser() {
        return this.user;
    }

    /*
        Parameters: none
        Returns: BOOLEAN true if a Firebase Auth user is logged in, false otherwise
        Actions: none
        Assumes: none
    */
    isAuthenticated() {
        return auth.user != null || auth.currentUser != null;
    }
}

let DBStore = new DatabaseStore();

EventStore.on("Upvote", DBStore.handleUpvote);
EventStore.on("Downvote", DBStore.handleDownvote);
EventStore.on("UserAuthenticated", DBStore.handleUserAuthenticated);