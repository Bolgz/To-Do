import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

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
        const user = userCredential.user;
        console.log(user);
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

  return (
    <div>
      <h1>Signup</h1>
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
      <button onClick={createUserAccount}>Sign Up</button>
      <button onClick={props.goToLogin}>Login In</button>
    </div>
  );
}

export default Singup;