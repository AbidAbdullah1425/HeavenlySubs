const firebaseConfig = {
  apiKey: "AIzaSyDsIeABdHyO_J9jOiY5m-P33kDEy_47zYI",
  authDomain: "heavenlysubs-7beba.firebaseapp.com",
  databaseURL: "https://heavenlysubs-7beba-default-rtdb.firebaseio.com",
  projectId: "heavenlysubs-7beba",
  storageBucket: "heavenlysubs-7beba.appspot.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();