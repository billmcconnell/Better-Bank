import React from 'react';
import { Card } from "./context";

export function Balance({ balance }) {

    return (
        <Card
            bgcolor="success"
            header='Account Balance'
            body={
                <>

                    <h4>Your current balance is ${balance}</h4>

                </>
            }
        />
    )
}