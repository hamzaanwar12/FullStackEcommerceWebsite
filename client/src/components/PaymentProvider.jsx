import React from "react";
import NewPayment from "./NewPayment";

export default function PaymentProvider() 
{
  return <NewPayment />;
}





/*
import React from 'react'
import Payment from './Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
export default function PaymentProvider({ stripeApiKey}) {
    return (
        <>
        {
            stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
            </Elements>
        }
        </>
    )
}

*/
