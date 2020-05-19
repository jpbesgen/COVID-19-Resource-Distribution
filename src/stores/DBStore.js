import EventEmitter from "events";
import {
	auth,
	database as db,
	storage as st,
	firebase_app as firebase,
} from "../FirebaseModule.js";

class DBStore extends EventEmitter {
	constructor() {
		super();
		this.queryLimit = 50;
		this.designs = {}; // key = design_id
		this.designListeners = [];
		this.designsMap = {};
		this.user = {};

		this.defaultPhotoUrl =
			"https://viima-app.s3.amazonaws.com/media/public/defaults/user-icon.png";

		// Method Binds

		// files
		this.uploadFile = this.uploadFile.bind(this);

		// designs
		this.uploadDesign = this.uploadDesign.bind(this);
		this.getDesignsForQueries = this.getDesignsForQueries.bind(this);
		this.listenForDesignsChange = this.listenForDesignsChange.bind(this);
		this.addDesign = this.addDesign.bind(this);
		this.updateDesign = this.updateDesign.bind(this);
		this.removeDesign = this.removeDesign.bind(this);
		this.upvoteDesign = this.upvoteDesign.bind(this);
		this.downvoteDesign = this.downvoteDesign.bind(this);
		this.fetchDesigns = this.fetchDesigns.bind(this);
		this.getDesignsMap = this.getDesignsMap.bind(this);
		this.getDesignsList = this.getDesignsList.bind(this);
		this.getTop3Designs = this.getTop3Designs.bind(this);

		// comments
		this.fetchCommentsForDesignByDoc = this.fetchCommentsForDesignByDoc.bind(
			this
		);
		this.fetchCommentsForDesignById = this.fetchCommentsForDesignById.bind(
			this
		);
		this.addComment = this.addComment.bind(this);
		this.editComment = this.editComment.bind(this);
		this.removeComment = this.removeComment.bind(this);
		this.userHasUpvotedComment = this.userHasUpvotedComment.bind(this);
		this.addCommentUpvote = this.addCommentUpvote.bind(this);
		this.removeCommentUpvote = this.removeCommentUpvote.bind(this);

		// auth
		this.authenticateUser = this.authenticateUser.bind(this);
		this.getAuthUser = this.getAuthUser.bind(this);
		this.getMyProfileUrl = this.getMyProfileUrl.bind(this);
		this.getProfileUrl = this.getProfileUrl.bind(this);
		this.getDBUser = this.getDBUser.bind(this);
		this.isAuthenticated = this.isAuthenticated.bind(this);
	}

	async uploadDesign(design) {
		return new Promise((resolve, reject) => {
			if (!this.isAuthenticated())
				reject(new Error("User not authenticated."));

			let { displayName, uid } = this.getAuthUser();
			design["user"] = displayName;
			design["uid"] = uid;

			db.runTransaction((transaction) => {
				let design_id = db.collection("Designs").doc().id,
					design_ref = db.collection("Designs").doc(design_id),
					user_ref = db.collection("Users").doc(uid);

				return transaction.get(user_ref).then((user_snapshot) => {
					if (!user_snapshot.exists)
						throw new Error("User document doesn't exist");

					transaction.update(user_ref, {
						designs: firebase.firestore.FieldValue.arrayUnion(
							design_id
						),
					});

					transaction.set(design_ref, design);
				});
			})
				.then(() => {
					// Transaction successful
					resolve();
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	async uploadFile(file, path) {
		return new Promise((resolve, reject) => {
			let filePut = st.child(path + file.name).put(file);

			filePut.on(
				firebase.storage.TaskEvent.STATE_CHANGED,
				// Progress
				(snapshot) => {
					// let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					// console.log("Upload is " + progress + "% done");
				},
				// Error
				(error) => {
					console.log(error);
					reject("Failure to upload " + file.name);
				},
				// Success
				() => {
					filePut.snapshot.ref
						.getDownloadURL()
						.then((downloadURL) => {
							resolve({
								name: file.name,
								url: downloadURL,
							});
						});
				}
			);
		});
	}

	async authenticateUser(authResult) {
		return new Promise((resolve, reject) => {
			db.runTransaction((transaction) => {
				let { user } = authResult,
					user_ref = db.collection("Users").doc(user.uid);

				return transaction.get(user_ref).then((user_snapshot) => {
					let user_doc = user_snapshot.data();

					if (!user_snapshot.exists || user_doc === null) {
						// New User
						transaction.set(user_ref, {
							name: user.displayName,
							email: user.email,
							emailVerified: user.emailVerified,
							phone: user.phoneNumber,
							uid: user.uid,
							photoUrl: user.photoURL,
							lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
							comments: [],
							designs: [],
							upvotedComments: [],
						});
					} else {
						// Returning User
						transaction.update(user_ref, {
							name:
								user_doc.name !== user.displayName
									? user.displayName
									: user_doc.name,
							email:
								user_doc.email !== user.email
									? user.email
									: user_doc,
							emailVerified: user.emailVerified,
							phone:
								user_doc.phone !== user.phoneNumber
									? user.phoneNumber
									: user_doc.phone,
							photoUrl:
								user_doc.photoUrl !== user.photoURL
									? user.photoURL
									: user_doc.photoUrl,
							lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
						});
					}
				});
			})
				.then(() => {
					// Transaction successful
					resolve();
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	/*
        queries = [
            ["upvotes", ">=", "6"],
            ["category", "==", "surgicalMask"]
        ]

        lastDoc - reference to the snapshot returned by 
    */
	async getDesignsForQueries(queries, lastDoc) {
		return new Promise((resolve, reject) => {
			let designs_ref = db.collection("Designs");
			queries.forEach((q) => {
				designs_ref = designs_ref.where(
					q[0], // field i.e. "upvotes"
					q[1], // operator i.e. ">"
					q[2] // value i.e. "5"
				);
			});
			designs_ref = designs_ref.orderBy("upvotes", "desc");

			if (lastDoc !== null) designs_ref = designs_ref.startAfter(lastDoc);

			designs_ref = designs_ref.limit(this.queryLimit);

			designs_ref
				.get()
				.then((designs_snapshot) => {
					let designs_docs = designs_snapshot.data();
					resolve({
						designs: designs_docs,
						lastDoc:
							designs_snapshot.docs[
								designs_snapshot.docs.length - 1
							],
					});
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	// Propagates design changes through event emitter
	listenForDesignsChange() {
		db.collection("Designs").onSnapshot(
			(querySnapshots) => {
				querySnapshots.docChanges().forEach((change) => {
					let doc = change.doc.data();
					switch (change.type) {
						case "added":
							this.addDesign(doc);
							break;

						case "modified":
							this.updateDesign(doc);
							break;

						case "removed":
							this.removeDesign(doc);
							break;
						default:
							break;
					}
				});
			},
			(error) => {
				console.log(error);
			}
		);
	}

	addDesign(doc) {
		let { id } = doc;
		//if(this.designs[id] !== null) throw new Error("Design can't be added.");
		//this.designs[id] = new Design(doc);
		this.designs[id] = doc;
		setTimeout(() => {
			this.emit("DesignsChange", doc);
		}, 0);
	}

	updateDesign(doc) {
		let { id } = doc;
		if (this.designs[id] === null)
			throw new Error("Design can't be updated");
		//this.designs[id].update(doc);
		this.designs[id] = doc;
		setTimeout(() => {
			this.emit("DesignsChange", doc);
		});
	}

	removeDesign(doc) {
		let { id } = doc;
		if (this.designs[id] === null)
			throw new Error("Design can't be removed");
		this.designs[id] = null;
		delete this.designs[id];
		setTimeout(() => {
			this.emit("DesignsChange", doc);
		});
	}

	async fetchCommentsForDesignByDoc(doc) {
		return new Promise((resolve, reject) => {
			let { comments } = doc;
			if (
				comments === undefined ||
				comments === null ||
				comments.length === 0
			) {
				resolve([]);
			}

			let comment_fetches = [];
			comments.forEach((comment_id) => {
				comment_fetches.push(
					db.collection("Comments").doc(comment_id).get()
				);
			});

			Promise.all(comment_fetches)
				.then((results) => {
					results = results.map((res) => {
						return res.data();
					});
					resolve(results);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	async fetchCommentsForDesignById(design_id) {
		return new Promise((resolve, reject) => {
			db.runTransaction((transaction) => {
				let design_ref = db.collection("Designs").doc(design_id);

				return transaction.get(design_ref).then((design_snapshot) => {
					if (!design_snapshot.exists) {
						throw new Error("Design doesn't exist");
					}

					let design_doc = design_snapshot.data();

					let commentsRefs = design_doc.comments;

					if (commentsRefs === null || commentsRefs.length === 0)
						return [];
					let commentsFetches = commentsRefs.map((c) => {
						let ref = db.collection("Comments").doc(c);
						return transaction.get(ref);
					});

					return Promise.all(commentsFetches).then(
						(fetchedComments) => {
							fetchedComments = fetchedComments.map((fc) => {
								return fc.data();
							});
							return fetchedComments;
						}
					);
				});
			})
				.then((comments) => {
					// Transaction successful
					resolve(comments);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	async addComment(design_id, comment_value) {
		return new Promise((resolve, reject) => {
			if (!this.isAuthenticated())
				reject("Please login before making a comment!");

			db.runTransaction((transaction) => {
				let user = this.getAuthUser(),
					comment_ref = db.collection("Comments").doc(),
					comment_id = comment_ref.id,
					user_ref = db.collection("Users").doc(user.uid),
					design_ref = db.collection("Designs").doc(design_id);

				return Promise.all([
					transaction.get(user_ref),
					transaction.get(design_ref),
				]).then((snapshots) => {
					let user_snapshot = snapshots[0],
						design_snapshot = snapshots[1];
					if (!user_snapshot.exists)
						throw new Error("User document doesn't exist");
					if (!design_snapshot.exists)
						throw new Error("Design document doesn't exist");

					transaction.set(comment_ref, {
						id: comment_id,
						time: firebase.firestore.FieldValue.serverTimestamp(),
						modified: firebase.firestore.FieldValue.serverTimestamp(),
						content: comment_value,
						author: user.displayName,
						uid: user.uid,
						design: design_id,
						upvoteCount: 0,
					});

					transaction.update(user_ref, {
						comments: firebase.firestore.FieldValue.arrayUnion(
							comment_id
						),
					});

					transaction.update(design_ref, {
						comments: firebase.firestore.FieldValue.arrayUnion(
							comment_id
						),
					});
				});
			})
				.then(() => {
					// Transaction successful
					resolve();
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	async editComment(comment_id, new_value, new_timestamp) {
		return new Promise((resolve, reject) => {
			if (!this.isAuthenticated())
				reject("Please login before editing a comment!");
			db.runTransaction((transaction) => {
				let comment_ref = db.collection("Comments").doc(comment_id);
				return transaction.get(comment_ref).then((comment_snapshot) => {
					if (!comment_snapshot.exists)
						throw new Error("Comment document doesn't exist");

					transaction.update(comment_ref, {
						content: new_value,
						modified: new_timestamp,
					});
				});
			})
				.then(() => {
					// Transaction succesful
					resolve();
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	async removeComment(comment_id) {
		return new Promise((resolve, reject) => {
			if (!this.isAuthenticated())
				reject("Please login before removing a comment!");

			db.runTransaction((transaction) => {
				let comment_ref = db.collection("Comments").doc(comment_id);

				return transaction.get(comment_ref).then((comment_snapshot) => {
					if (!comment_snapshot.exists)
						throw new Error("Comment document doesn't exist");

					let comment_doc = comment_snapshot.data(),
						design_id = comment_doc.design,
						{ uid } = comment_doc,
						design_ref = db.collection("Designs").doc(design_id),
						user_ref = db.collection("Users").doc(uid);

					transaction.update(design_ref, {
						comments: firebase.firestore.FieldValue.arrayRemove(
							comment_id
						),
					});

					transaction.update(user_ref, {
						comments: firebase.firestore.FieldValue.arrayRemove(
							comment_id
						),
					});

					transaction.delete(comment_ref);
				});
			})
				.then(() => {
					// Transaction succesful
					resolve();
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	async upvoteDesign(design_id) {
		return new Promise((resolve, reject) => {
			if (!this.isAuthenticated())
				reject("Please login before upvoting a design!");

			db.runTransaction((transaction) => {
				let user = this.getAuthUser(),
					{ uid } = user,
					user_ref = db.collection("Users").doc(uid),
					design_ref = db.collection("Designs").doc(design_id),
					increment = 1;

				return transaction.get(user_ref).then((user_snapshot) => {
					if (!user_snapshot.exists)
						throw new Error("User document doesn't exist");

					let user_doc = user_snapshot.data();

					// Check if user has already upvoted
					if (
						user_doc.upvotes !== null &&
						user_doc.upvotes.includes(design_id)
					) {
						throw new Error(
							"You can't upvote a design more than once!"
						);
					}

					// Check if user has downvoted
					if (
						user_doc.downvotes !== null &&
						user_doc.downvotes.includes(design_id)
					)
						increment++;

					transaction.update(user_ref, {
						upvotes: firebase.firestore.FieldValue.arrayUnion(
							design_id
						),
						downvotes:
							increment > 1
								? firebase.firestore.FieldValue.arrayRemove(
										design_id
								  )
								: user_doc.downvotes,
					});

					transaction.update(design_ref, {
						upvotes: firebase.firestore.FieldValue.increment(
							increment
						),
					});
				});
			})
				.then(() => {
					// Transaction successful
					resolve();
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	async downvoteDesign(design_id) {
		return new Promise((resolve, reject) => {
			if (!this.isAuthenticated())
				reject("Please login before downvoting a design!");

			db.runTransaction((transaction) => {
				let user = this.getAuthUser(),
					{ uid } = user,
					user_ref = db.collection("Users").doc(uid),
					design_ref = db.collection("Designs").doc(design_id),
					increment = 1;

				return transaction.get(user_ref).then((user_snapshot) => {
					if (!user_snapshot.exists)
						throw new Error("User document doesn't exist");

					let user_doc = user_snapshot.data();

					// Check if user has already downvoted
					if (
						user_doc.downvotes !== null &&
						user_doc.downvotes.includes(design_id)
					) {
						throw new Error(
							"You can't downvote a design more than once!"
						);
					}

					// Check if user has upvoted
					if (
						user_doc.upvotes !== null &&
						user_doc.upvotes.includes(design_id)
					)
						increment++;

					transaction.update(user_ref, {
						upvotes:
							increment > 1
								? firebase.firestore.FieldValue.arrayRemove(
										design_id
								  )
								: user_doc.upvotes,
						downvotes: firebase.firestore.FieldValue.arrayUnion(
							design_id
						),
					});

					transaction.update(design_ref, {
						upvotes: firebase.firestore.FieldValue.increment(
							-increment
						),
					});
				});
			})
				.then(() => {
					// Transaction successful
					resolve();
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	async userHasUpvotedComment(uid, comment_id) {
		return new Promise((resolve, reject) => {
			if (uid === undefined || uid === null)
				reject("User ID not supplied");
			if (comment_id === undefined || comment_id === null)
				reject("Comment ID not supplied");

			let user_ref = db.collection("Users").doc(uid);

			user_ref
				.get()
				.then((user_snapshot) => {
					if (!user_snapshot.exists)
						throw new Error("User document doesn't exist");

					let user_doc = user_snapshot.data();

					// Check if there are any upvoted comments
					if (
						user_doc.upvotedComments === null ||
						user_doc.upvotedComments.length === 0
					) {
						resolve(false);
					}

					// Check if comment_id is in the upvoted list
					let isInList = user_doc.upvotedComments.includes(
						comment_id
					);

					resolve(isInList);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	async addCommentUpvote(comment_id) {
		return new Promise((resolve, reject) => {
			if (!this.isAuthenticated())
				reject("Please login before upvoting comments!");

			db.runTransaction((transaction) => {
				let user = this.getAuthUser(),
					{ uid } = user,
					user_ref = db.collection("Users").doc(uid),
					comment_ref = db.collection("Comments").doc(uid);

				return Promise.all([
					transaction.get(user_ref),
					transaction.get(comment_ref),
				]).then((snapshots) => {
					let user_snapshot = snapshots[0],
						comment_snapshot = snapshots[1];
					if (!user_snapshot.exists)
						throw new Error("User document doesn't exist");
					if (!comment_snapshot.exists)
						throw new Error("Comment document doesn't exist");

					let user_doc = user_snapshot.data();
					// comment_doc = comment_snapshot.data();

					// Check if already upvoted
					if (
						user_doc.upvotedComments !== null &&
						user_doc.upvotedComments.includes(comment_id)
					) {
						throw new Error("You can only upvote a comment once");
					}

					transaction.update(comment_ref, {
						upvoteCount: firebase.firestore.FieldValue.increment(1),
					});

					transaction.update(user_ref, {
						upvotedComments: firebase.firestore.FieldValue.arrayUnion(
							comment_id
						),
					});
				});
			})
				.then(() => {
					// Transaction successful
					resolve();
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	async removeCommentUpvote(comment_id) {
		return new Promise((resolve, reject) => {
			if (!this.isAuthenticated())
				reject("Please login to remove a comment upvote!");

			db.runTransaction((transaction) => {
				let user = this.getAuthUser(),
					{ uid } = user,
					user_ref = db.collection("Users").doc(uid),
					comment_ref = db.collection("Comments").doc(comment_id);

				return Promise.all([
					transaction.get(user_ref),
					transaction.get(comment_ref),
				]).then((snapshots) => {
					let user_snapshot = snapshots[0],
						comment_snapshot = snapshots[1];
					if (!user_snapshot.exists)
						throw new Error("User document doesn't exist");
					if (!comment_snapshot.exists)
						throw new Error("Comment document doesn't exist");

					let user_doc = user_snapshot.data();

					// Check if user hasn't upvoted, if not, just return
					if (
						user_doc.upvotedComments !== null &&
						!user_doc.upvotedComments.includes(comment_id)
					)
						return;

					transaction.update(comment_ref, {
						upvoteCount: firebase.firestore.FieldValue.increment(
							-1
						),
					});

					transaction.update(user_ref, {
						upvotedComments: firebase.firestore.FieldValue.arrayRemove(
							comment_id
						),
					});
				});
			})
				.then(() => {
					// Transaction successful
					resolve();
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	getAuthUser() {
		return auth.user === null ? auth.currentUser : auth.user;
	}

	getMyProfileUrl() {
		let user = this.getAuthUser();
		return user !== null && user.hasOwnProperty("photoURL")
			? user.photoURL
			: this.defaultPhotoUrl;
	}

	async getProfileUrl(uid) {
		return new Promise((resolve, reject) => {
			let user_ref = db.collection("Users").doc(uid);

			user_ref
				.get()
				.then((user_snapshot) => {
					if (!user_snapshot.exists)
						throw new Error("User document doesn't exist");

					let user_doc = user_snapshot.data();

					if (user_doc.hasOwnProperty("photoUrl")) {
						resolve(user_doc.photoUrl);
					} else {
						resolve(this.defaultPhotoUrl);
					}
				})
				.catch((error) => {
					console.log(error);
					resolve(this.defaultPhotoUrl);
				});
		});
	}

	getDBUser() {
		return this.user;
	}

	isAuthenticated() {
		return auth.user !== null || auth.currentUser !== null;
	}

	async fetchDesigns() {
		try {
			const designsRef = db.collection("Designs");
			const allDesignsArray = await designsRef.get();
			const allDesigns = [];

			allDesignsArray.forEach((design) => {
				allDesigns.push(design.data());
			});

			return allDesigns;
		} catch (err) {
			console.log("Could not fetch designs:", err);
			return { err };
		}
	}

	getDesignsList() {
		return Object.keys(this.designs).map((key) => this.designs[key]);
	}

	getDesignsMap() {
		return this.designsMap;
	}

	async getTop3Designs(params, isMakeFlow) {
		const { materials, ppe, tools } = params;
		try {
			let designs = await this.fetchDesigns();
			designs = designs.filter((design) => {
				const materialsFilter =
					materials.includes("other") ||
					materials.some((material) =>
						design.tags.materials.includes(material)
					);
				const ppeFilter =
					ppe.includes("other") ||
					ppe.some((ppe) => design.tags.ppe.includes(ppe));
				const toolsFilter =
					(tools.length === 0 &&
						design.tags.tools.includes("none")) ||
					tools.some((tool) => design.tags.tools.includes(tool));

				return isMakeFlow
					? materialsFilter && toolsFilter && ppeFilter
					: ppeFilter;
			});
			designs = designs.sort((a, b) => b.upvotes - a.upvotes);
			return designs.slice(0, 3);
		} catch (err) {
			console.log("Could not fetch designs:", err);
			return { err };
		}
	}
}

let dbstore = new DBStore();
export default dbstore;
