import * as firebase from "firebase";
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

let fb = firebase.initializeApp(firebaseConfig);

export default {
    auth: fb.auth(),
    database: fb.firestore(),
    storage: fb.storage().ref(),
    analytics: fb.analytics()
};
