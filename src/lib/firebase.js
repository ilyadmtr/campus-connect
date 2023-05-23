import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyChv-Bavj2IlZCPMyn1KYunu2eBLSMNQG8",
    authDomain: "campus-connect-5ae1a.firebaseapp.com",
    projectId: "campus-connect-5ae1a",
    storageBucket: "campus-connect-5ae1a.appspot.com",
    messagingSenderId: "79852379218",
    appId: "1:79852379218:web:df4e912930b191810b538b"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);