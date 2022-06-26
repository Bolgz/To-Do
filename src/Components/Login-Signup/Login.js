import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import React, { useState } from "react";
import Signup from "./Signup";
import "./Login.css";

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
      <div className="main-content">
        <h1 className="title-text">Welcome Back!</h1>

        <div className="form-container">
          <p className="login-text">Log in!</p>
          <p className="email-label">Email</p>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="email-input"
          ></input>
          <p className="password-label">Password</p>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="password-input"
          ></input>
          <button onClick={setAuthPersistence} className="login_button">
            Log in
          </button>
          <div style={{ textAlign: "center" }}>
            <button onClick={toggleLoginSignup} className="signup_button">
              Click here to Sign Up!
            </button>
          </div>
        </div>

        <div className="footer-login">
          <a href="https://github.com/Bolgz">
            <p className="copyrighttext">Marco Freemantle</p>
            <UseAnimations
              animation={github}
              size={40}
              className="github_icon"
              fillColor="White"
              strokeColor="White"
              autoplay={true}
              loop={true}
            />
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <Signup goToLogin={toggleLoginSignup} handleLogin={props.handleLogin} />
    );
  }
}

export default Login;
