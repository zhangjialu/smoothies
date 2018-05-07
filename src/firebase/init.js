import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCHT6O_TTvxrujDUKgtkIpF6jZunoYgTMk",
  authDomain: "smoothies-ea6be.firebaseapp.com",
  databaseURL: "https://smoothies-ea6be.firebaseio.com",
  projectId: "smoothies-ea6be",
  storageBucket: "smoothies-ea6be.appspot.com",
  messagingSenderId: "561921704978"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })
// export firestore database
export default firebaseApp.firestore()