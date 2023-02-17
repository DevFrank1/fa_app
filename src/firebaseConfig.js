// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';

import { useNavigate } from "react-router-dom";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyCq1N9Z_HUj7F5hrdiDZ_-MoBYB1eODMtw",
  // authDomain: "fa-app-a5137.firebaseapp.com",
  // projectId: "fa-app-a5137",
  // storageBucket: "fa-app-a5137.appspot.com",
  // messagingSenderId: "375599250293",
  // appId: "1:375599250293:web:f6dd164c3576df1263713c",
  // measurementId: "G-C8RGX253KX"
  apiKey: "AIzaSyBZ7wiPvK_y7taladRltTEhXX2-iZ7bwt4",
  authDomain: "fba-app-4e68b.firebaseapp.com",
  projectId: "fba-app-4e68b",
  storageBucket: "fba-app-4e68b.appspot.com",
  messagingSenderId: "40738636980",
  appId: "1:40738636980:web:2ce59de4c0a00aa0de03e1",
  measurementId: "G-GZDNRNSTEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

// export const signInWithGoogle = () => {
//     const navigate = useNavigate();
//     signInWithPopup(auth, provider).then((result) => {
//         const name = result.user.displayName;
//         const email = result.user.email;
//         const profilePic = result.user.photoURL;

//         localStorage.setItem('name', name);
//         localStorage.setItem('email', email);
//         localStorage.setItem('profilePic', profilePic);
//     }).then(() => {
//         navigate('/home');
//     }).catch((error) => {
//         console.log(error);
//     });
// };

// export const logOut = () => {
//     signOut(auth).then(() => {
//         localStorage.setItem('name', '');
//         localStorage.setItem('email', '');
//         localStorage.setItem('profilePic', '');
//         console.log('logout successfully');
//     }).catch(() => {
//         console.log('error');
//     })
// }