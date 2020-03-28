// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
	callbacks: {
		signInSuccessWithAuthResult: function(authResult, redirectUrl) {
			// User successfully signed in.
			// Return type determines whether we continue the redirect automatically
			// or whether we leave that to developer to handle.
			
			// Check if new user, create profile
			console.log(authResult);
			let db = firebase.firestore();
			db.collection("Users").doc(authResult.uid).get().then((snapshot) => {
				console.log(snapshot.data())
			}).catch((error) => {
				console.log(error);
				db.collection("Users").doc(authResult.uid).set({
					uid: authResult.uid
				});
			});
			
			return true;
		},
		uiShown: function() {
			// The widget is rendered.
			// Hide the loader.
			document.getElementById('loader').style.display = 'none';
		}
	},
	// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
	signInFlow: 'popup',
	signInSuccessUrl: '/index.html',
	signInOptions: [
		// Leave the lines as is for the providers you want to offer your users.
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.FacebookAuthProvider.PROVIDER_ID,
	],
	// Terms of service url.
	tosUrl: 'https://www.google.com/',
	// Privacy policy url.
	privacyPolicyUrl: 'https://www.google.com/'
};

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
