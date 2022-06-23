import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import React, { useState } from "react";
import Signup from "./Signup";

function Login(props) {
  //State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //State for if user wants to login or signup
  const [isLogin, setIsLogin] = useState(true);

  //Logs in users and sets their authentication persistence
  function setAuthPersistence() {
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with local persistence.
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            props.handleLogin();
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  //Switches between login and signup pages
  function toggleLoginSignup() {
    setIsLogin(!isLogin);
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
        <button onClick={setAuthPersistence}>Login Up</button>
        <button onClick={toggleLoginSignup}>Sign Up</button>
      </div>
    );
  } else {
    return (
      <Signup goToLogin={toggleLoginSignup} handleLogin={props.handleLogin} />
    );
  }
}

export default Login;
