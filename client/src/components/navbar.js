import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export function NavBar({ user, isLoggedIn, signOut }) {
   const location = useLocation();

   return (
      <>
         <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
               <Link to="/" className="navbar-brand">
                  Better Bank
               </Link>
               <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                     <li className="nav-item">
                        <Link to="/createAccount" className="nav-link">
                           Create Account
                        </Link>
                     </li>
                     <li className="nav-item">
                        <Link to="/deposit" className="nav-link">
                           Deposit
                        </Link>
                     </li>
                     <li className="nav-item">
                        <Link to="/withdraw" className="nav-link">
                           Withdraw
                        </Link>
                     </li>
                     <li className="nav-item">
                        <Link to="/balance" className="nav-link">
                           Balance
                        </Link>
                     </li>
                     <li className="nav-item">
                        <Link to="/allData" className="nav-link">
                           All Data
                        </Link>
                     </li>
                     <div className="text-dark">  <p className="nav-link px-5 m-0"> {user.name} </p></div>
                     <div className="nav navbar-nav navbar-right">
                        {!isLoggedIn ? (
                           <Link className={`btn btn-primary navbar-btn ${location.pathname === "/login" ? "active" : ''}`} aria-current="page" to="/login" data-toggle="tooltip" title="Click here to login to your account."> Login </Link>
                        ) : (
                           <button type="button" className="btn btn-primary navbar-btn" onClick={() => signOut()}>Log Out</button>)
                        }</div>

                  </ul>
               </div>
            </div>
         </nav>
      </>
   );
}
