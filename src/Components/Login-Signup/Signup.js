import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import "./Signup.css";

function Singup(props) {
  //State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //State for if an signup error occurs
  const [signupError, setSignupError] = useState("");

  //Handles account creation
  function createUserAccount() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        //Switches to home screen upon account creation
        props.handleLogin();
      })
      .catch((error) => {
        const errorMessage = error.message;
        setSignupError(errorMessage);
        console.log(errorMessage);
      });
  }

  //Gets the appropriate error message for the signup error
  function getSignupErrorMessage() {
    if (signupError === "Firebase: Error (auth/email-already-in-use).") {
      return <p className="error-message-signup">Email already in use</p>;
    } else if (signupError === "Firebase: Error (auth/invalid-email).") {
      return <p className="error-message-signup">Invalid email</p>;
    } else if (
      signupError ===
      "Firebase: Password should be at least 6 characters (auth/weak-password)."
    ) {
      return <p className="error-message-signup">Password is too weak</p>;
    } else if (signupError === "Firebase: Error (auth/missing-password).") {
      return <p className="error-message-signup">Password is missing</p>;
    } else if (signupError === "Firebase: Error (auth/missing-email).") {
      return <p className="error-message-signup">Email is missing</p>;
    }
  }

  return (
    <div className="main-content">
      <h1 className="title-text">Welcome to To-do!</h1>

      <div className="form-container">
        <p className="login-text">Sign Up!</p>
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
        <p className="error-message-signup">{getSignupErrorMessage()}</p>
        <button onClick={createUserAccount} className="signup">
          Sign up!
        </button>
        <div style={{ textAlign: "center" }}>
          <button onClick={props.goToLogin} className="login">
            Click here to Log in!
          </button>
        </div>
      </div>

      <div className="footer-signup">
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
}

export default Singup;
