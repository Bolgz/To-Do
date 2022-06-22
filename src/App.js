import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login-Signup/Login";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
  function getIsLoggedIn() {
    const auth = getAuth();
    console.log(auth.currentUser);
    return auth.currentUser !== null;
  }

  //Sets authentication status for current user
  function setAuthentication() {
    setIsLoggedIn(getIsLoggedIn());
  }

  if (getIsLoggedIn()) {
    return <Home handleLogout={setAuthentication} />;
  } else {
    return <Login handleLogin={setAuthentication} />;
  }
}

export default App;
