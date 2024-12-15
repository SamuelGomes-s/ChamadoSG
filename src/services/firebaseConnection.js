import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD6FlAuGe3EZJn0C2mRZuN_deEVuzJJc4w",
    authDomain: "sistema-chamados-2ce65.firebaseapp.com",
    projectId: "sistema-chamados-2ce65",
    storageBucket: "sistema-chamados-2ce65.firebasestorage.app",
    messagingSenderId: "283246300823",
    appId: "1:283246300823:web:82bc5c470887ca90e3e3d2",
    measurementId: "G-3T15W6Z9K6"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)


export {
    db,
    auth,
    storage
}