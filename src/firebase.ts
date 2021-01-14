import firebase from 'firebase/app'
import "firebase/database"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "AIzaSyAiuucXI6pytwuvH22g1M__o6TRjy2qLNU",
    authDomain: "senso-adventure.firebaseapp.com",
    databaseURL: "https://senso-adventure-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "senso-adventure",
    storageBucket: "senso-adventure.appspot.com",
    messagingSenderId: "740993056701",
    appId: "1:740993056701:web:0c234d9574a675f017dcd4",
    measurementId: "G-REHMWKJQBX"
};
// const config = {
//     apiKey: process.env.REACT_APP_APIKEY,
//     authDomain: process.env.REACT_APP_AUTHDOMAIN,
//     databaseURL: process.env.REACT_APP_DB,
//     projectId: process.env.REACT_APP_PID,
//     storageBucket: process.env.REACT_APP_SB,
//     messagingSenderId: process.env.REACT_APP_SID,
//     appId: process.env.REACT_APP_APPID,
//     measurementId: process.env.REACT_APP_MID
// };
firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const storage = firebase.storage();
export const todosRef = databaseRef.child("todos")
export const campaignsRef = databaseRef.child("campaigns")
export default firebase;