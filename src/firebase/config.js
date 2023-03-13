import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, FacebookAuthProvider, getAdditionalUserInfo, connectAuthEmulator  } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import {addDocument, generateKeywords} from "./services";


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

connectAuthEmulator(auth,'http://localhost:9099')

if(window.location.hostname === 'localhost'){
    connectFirestoreEmulator(db, 'localhost', 8080);
}
const fbProvider = new FacebookAuthProvider()
const SignInWithPopup = async () => {
    const result =  await signInWithPopup(auth, fbProvider)
    const additionalUserInfo = await getAdditionalUserInfo(result)
    if(additionalUserInfo?.isNewUser){
        await addDocument("users", {
            displayName: result?.user.displayName,
            email: result?.user.email,
            photoURL: result?.user.photoURL,
            uid: result?.user.uid,
            provider: result?.providerId,
            keywords: generateKeywords(result?.user.displayName?.toLowerCase())
        } )

    }
}
export {auth, db , fbProvider, SignInWithPopup}
