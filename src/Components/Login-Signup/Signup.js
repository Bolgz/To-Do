import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import "./Signup.css";

function Singup(props) {
  //State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        console.log(errorMessage);
      });
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
        <button onClick={createUserAccount} className="signup">
          Sign up!
        </button>
        <button onClick={props.goToLogin} className="login">
          Click here to Log in!
        </button>
      </div>

      <div className="footer">
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
