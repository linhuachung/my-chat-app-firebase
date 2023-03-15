import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBEVadBo0CQHftqbI4dzghcg84OMIn-umM",
    authDomain: "my-chat-app-d852e.firebaseapp.com",
    projectId: "my-chat-app-d852e",
    storageBucket: "my-chat-app-d852e.appspot.com",
    messagingSenderId: "827948049014",
    appId: "1:827948049014:web:6e23dc2a47dcc2755b7557",
    measurementId: "G-QH8RYBHT37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);


if(process.env.REACT_APP_URL === 'localhost'){
    connectAuthEmulator(auth,`${process.env.REACT_APP_URL}`)
    connectFirestoreEmulator(db, 'localhost', 8080);
}

export {auth, db}
