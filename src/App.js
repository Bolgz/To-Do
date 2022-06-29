import "./App.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login-Signup/Login";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as utilities from "./Components/Utilities/FireStoreUtilities";
import React, { useState, useEffect } from "react";
import ParticlesBg from "particles-bg";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTTAPNieFl1SAg-cUb1I-AYRIf-itQDOE",
  authDomain: "to-do-app-79d91.firebaseapp.com",
  projectId: "to-do-app-79d91",
  storageBucket: "to-do-app-79d91.appspot.com",
  messagingSenderId: "552158585938",
  appId: "1:552158585938:web:b26e29e3260b4ebc646b8b",
  measurementId: "G-25Q3B102BL",
};

//Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Using useEffect to check if the user is logged in stops inifite loop
  useEffect(() => {
    //Checks if current user is logged in
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      //User is logged in
      if (user) {
        //Shows home page if user is logged in
        setIsLoggedIn(true);
        //Checks if user is in Firestore database
        utilities.getUser(user.uid).then((userExists) => {
          //If user is not in database
          if (!userExists) {
            //Adds user to Firestore database
            utilities.addUser(user.uid);
          } else {
            //User is in database so do nothing
            return;
          }
        });
      } else {
        //User is not logged in
        console.log(auth.currentUser);
        setIsLoggedIn(false);
      }
    });
  }, []);

  if (isLoggedIn) {
    return (
      <div>
        <Home /> <ParticlesBg type="cobweb" bg={true} color="0000ff" />
      </div>
    );
  } else {
    return <Login />;
  }
}

export default App;
