import React, { useState } from "react";
import { Card } from "./context";
import { validateAmounts } from "./utilities/validateAmounts";

export function Deposit({ adjustBalance, balance }) {
   const [statusMessage, setStatusMesssage] = useState('');
   const [depositAmount, setDepositAmount] = useState('');

   const validationError = validateAmounts(depositAmount)

   function handleDeposit() {

      if (validationError) {
         setStatusMesssage(`Error: Deposit ${validationError}`);
         console.log('see validation in deposit.js')
         return;
      }

      adjustBalance(depositAmount)

      setDepositAmount('');
      // setStatusMesssage( `Deposit successful! Your current account balance is $${ balance }.` );
      setStatusMesssage( `Deposit successful!` );

   }

   return (
      <Card
         bgcolor="success"
         header='Deposit Funds'
         status={statusMessage}
         body=
         {
            <>
               Amount to Deposit
               <br />
               <input
                  type="input"
                  className="form-control"
                  id="deposit"
                  placeholder="Enter Amount"
                  value={depositAmount}
                  onChange={e => setDepositAmount(e.currentTarget.value)}
               />
               <br />
               <button
                  type="submit"
                  className="btn btn-light"
                  onClick={() => handleDeposit()}
                  disabled={depositAmount === ''}
               >
                  Deposit
               </button>
               <br />
               <br />
            </>

         }
      />
   )

}