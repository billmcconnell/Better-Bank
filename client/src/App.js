import { Route, HashRouter, Routes, Navigate } from "react-router-dom";
import { useState, useCallback } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import "./App.css";
import { CreateAccount } from "./components/createaccount";
import { Login } from './components/logIn';
import { Withdraw } from "./components/withdraw";
import { Home } from "./components/home";
import { Deposit } from "./components/deposit";
import { Balance } from "./components/balance";
import { AllData } from "./components/alldata";
import { NavBar } from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";

// consider using env to hold the firebase apiKey and other info

const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const firebaseAuthDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const firebaseProjectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const firebaseStorageBucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const firebaseMessagingSenderId = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const firebaseAppId = process.env.REACT_APP_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey: (firebaseApiKey),
  authDomain: (firebaseAuthDomain),
  projectId: (firebaseProjectId),
  storageBucket: (firebaseStorageBucket),
  messagingSenderId: (firebaseMessagingSenderId),
  appId: (firebaseAppId)
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const nullUser = { balance: 0 };

function App() {

  // const baseUrl = process.env.PORT;
  // const baseUrl = process.env.PORT || 'http://localhost:5500';
  const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5500';

  const [status, setStatus] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  // balance is initialized temporarily to prevent user.balance from breaking routes using it.
  const [user, setUser] = useState(nullUser);

  let initializeUser = async (email, password) => {
    try {
      const res = await fetch(`${baseUrl}/account/login/${email}/${password}`);
      const tempUser = await res.json();
      console.log("tempUser", tempUser);
      setUser(tempUser);
      setLoggedIn(true);
    } catch (err) {
      console.log(err);
      return "login failed";
    }
  }

  let adjustBalance = (amount) => {
    fetch(`${baseUrl}/account/adjust/${user.email}/${Number(amount)}`)
      .then(async (res) => {
        const newBalance = await res.json();
        setUser({ ...user, balance: newBalance })
        if (amount === null) {
          setStatus('Balance error')
        }
        console.log(newBalance);
      })
      .catch((err) => {
        console.log(err);

      })
    if (user.balance != typeof Number) {
      setStatus('Balance error')
      return status
    }
    return (user.balance, status)
  };

  function logIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        // const user = userCredential.user;
        initializeUser(email, password)
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        return console.log(error)
      });
  }

  function createWithFirebase(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        // const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        return console.log(error)
        // ..
      })
  }

  const logOut = useCallback(() => {
    const user = auth.currentUser;
    if (user) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          setLoggedIn(false);
          setUser(nullUser);
          // window.location.href = '/';
          console.log('User signed out');
        })
        .catch((error) => {
          console.error('Sign-out error:', error);
        });
    } else {
      console.log('No users');
    }
  }, []);

  return (
    <HashRouter basename="/">
      <NavBar user={user} isLoggedIn={loggedIn} signOut={logOut} />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/CreateAccount/" element={<CreateAccount initializeUser={initializeUser} createWithFirebase={createWithFirebase} />} />
        <Route path="/login" element={!loggedIn ? <Login logIn={logIn} /> : <Navigate to="/" />} />
        <Route path="/deposit" element={loggedIn ? <Deposit balance={user.balance} adjustBalance={adjustBalance} /> : <Navigate to="/login" />} />
        <Route path="/withdraw" element={loggedIn ? <Withdraw balance={user.balance} adjustBalance={adjustBalance} /> : <Navigate to="/login" />} />
        <Route path="/balance" element={loggedIn ? <Balance balance={user.balance} /> : <Navigate to="/login" />} />
        <Route path="/alldata" element={loggedIn ? <AllData /> : <Navigate to="/login" />} />
      </Routes>
    </HashRouter >
  );
}

export default App;
