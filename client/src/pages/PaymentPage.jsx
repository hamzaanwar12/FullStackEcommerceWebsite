import React from 'react'
import Payment from '../components/Payment'
import Header from '../components/Header'
import UserOptions from '../components/UserOptions'
import Footer from '../components/Footer'
import PaymentProvider from '../components/PAymentProvider'

export default function PaymentPage({stripeApiKey}) {

    return (
        <>
            <Header />
            <UserOptions />
            {/* <PaymentProvider stripeApiKey={stripeApiKey}/> */}
            <PaymentProvider />
            <Footer />
        </>
    )
}


