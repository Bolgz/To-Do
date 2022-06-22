import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./Signup";

function Login(props) {
  //State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //State for if user wants to login or signup
  const [isLogin, setIsLogin] = useState(true);

  //Handles user login
  function loginUser() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        props.handleLogin();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  //Checks if current user is logged in
  function isLoggedIn() {
    const auth = getAuth();
    return auth.currentUser !== null;
  }

  function toggleLoginSignup() {
    setIsLogin(!isLogin);
    console.log("called");
  }

  if (isLogin) {
    return (
      <div>
        <h1>Login</h1>
        <b>Email</b>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <b>Password</b>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={loginUser}>Login Up</button>
        <button onClick={toggleLoginSignup}>Sign Up</button>
      </div>
    );
  } else {
    return <Signup goToLogin={toggleLoginSignup} />;
  }
}

export default Login;
