import "./App.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login-Signup/Login";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";

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
const app = initializeApp(firebaseConfig);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Checks if current user is logged in
  async function getIsLoggedIn() {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        //User is logged in
        console.log(auth.currentUser);
        setIsLoggedIn(true);
      } else {
        //User is not logged in
        console.log(auth.currentUser);
        setIsLoggedIn(false);
      }
    });
  }

  //Sets authentication status for current user
  function setAuthentication() {
    setIsLoggedIn(getIsLoggedIn());
  }

  getIsLoggedIn();

  if (isLoggedIn) {
    return <Home handleLogout={setAuthentication} />;
  } else {
    return <Login handleLogin={setAuthentication} />;
  }
}

export default App;
