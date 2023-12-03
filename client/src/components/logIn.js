import React, { useState } from "react";
import { Card } from "./context";

export function Login({ logIn }) {
   const [statusMessage, setStatusMessage] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleSubmit = async (event) => {
      console.log("logging in with the provided creds: ", "email: ", email);
      try {
         const loginResult = await logIn(email, password);
         if (loginResult) {
            setStatusMessage("Login successful");
         } else {
            setStatusMessage("Invalid credentials");
         }
      } catch (error) {
         // Handle any errors that might occur during the login process
         console.error("Login error: ", error);
         setStatusMessage("Login failed");
      }
   };

   return (
      <Card
         bgcolor="success"
         header="Login"
         status={statusMessage}
         body={
            <>
               Email address<br />
               <input
                  type="input"
                  className="form-control"
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={e => { setEmail(e.currentTarget.value) }}
               />
               <br />
               Password
               <br />
               <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={e => setPassword(e.currentTarget.value)} />
               <br />
               <button
                  type="submit"
                  className="btn btn-light"
                  onClick={() => handleSubmit(email, password)}
               >
                  Login
               </button>
               <br />
               <br />
            </>
         }
      />
   )
}