import React from 'react';
import '../App.css'

export function Home() {
   const customStyles = {
       width: "32rem",
       padding: "10px",
       zIndex: "-1",
       align: "center",
   };

   return (
       <>
       <br />
       <br />
           <div className="container">
               <div className="card-container">
                   <div className="card" style={customStyles}>
                       <h2 className="card-title">Better Bank</h2>
                       <img src="./images/badbanker.jpeg" className="App-logo" alt="..." />
                       <div className="card-body">
                           <p className="card-text">
                               Welcome to Better Bank, where we care about your money a LOT more than you do!
                           </p>
                       </div>
                   </div>
               </div>
           </div>
       </>

   );
}
