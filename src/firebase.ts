import firebase from 'firebase/app'
import 'firebase/storage';
import 'firebase/database';
import 'firebase/auth';


export const CrestImageFileLocation = "/Images/Crest/"
export const BackgroundImageFileLocation = "/Images/Background/"
export const CampaignTitleImageFileLocation = "/Images/CampaignTitle/"

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
firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const storage = firebase.storage();
export const firebaseStorageRef = storage.ref()
export const campaignsRef = databaseRef.child("campaigns")
export const firebaseAuth = firebase.auth()
