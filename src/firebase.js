import firebase from "firebase";
const config = {
  apiKey: "AIzaSyB1aBvfUQBjcO77JTd-EIZ5kVumX6YvQLg",
  authDomain: "playlist-33aff.firebaseapp.com",
  databaseURL: "https://playlist-33aff.firebaseio.com",
  projectId: "playlist-33aff",
  storageBucket: "playlist-33aff.appspot.com",
  messagingSenderId: "648910256394",
  appId: "1:648910256394:web:e156ccbc23619d6db462f3",
  measurementId: "G-4NZRH6CBZC",
};
// Initialize Firebase
firebase.initializeApp(config);
firebase.analytics();

export default firebase;
