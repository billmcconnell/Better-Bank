import React, { useState } from "react";
import { Card } from "./context";
import { validateAmounts } from "./utilities/validateAmounts";

export function Withdraw({ adjustBalance, balance }) {
    const [statusMessage, setStatusMessage] = useState('');
    const [withdrawalAmount, setWithdrawalAmount] = useState('');

    const validationError = validateAmounts(withdrawalAmount)

    function handleWithdrawal() {

        if (validationError) {
            setStatusMessage(`Error Withdrawal ${validationError}`);
            console.log('see validation in withdrawl.js')
            return;
        }

        if (withdrawalAmount > balance) {
            setStatusMessage('Insufficient funds.');
            return;
        }

        adjustBalance(-withdrawalAmount)

        setWithdrawalAmount('');
        // setStatusMessage( `Withdrawal successful! Your current account balance is $${ balance }.` );
        setStatusMessage( `Withdrawal successful!` );
    }

    return (
        <Card
            bgcolor="success"
            header='Withdraw Funds'
            status={statusMessage}
            body={
                <>
                    Amount to Withdraw<br />
                    <input
                        type="input"
                        className="form-control"
                        id=""
                        placeholder="Enter Amount"
                        value={withdrawalAmount}
                        onChange={e => setWithdrawalAmount(e.currentTarget.value)}
                    />
                    <br />
                    <button
                        type="submit"
                        className="btn btn-light"
                        onClick={handleWithdrawal}
                        disabled={withdrawalAmount === ''}
                    >
                        Withdraw
                    </button>
                    <br />
                    <br />
                </>
            }
        />
    )
}