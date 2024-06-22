import React from 'react'
import Payment from '../components/Payment'
import Header from '../components/Header'
import UserOptions from '../components/UserOptions'
import Footer from '../components/Footer'
import CreateProduct from '../components/CreateProduct'

export default function PaymentPage({stripeApiKey}){
    
    return (
        <>
            <Header />
            <UserOptions />
            {/* <PaymentProvider stripeApiKey={stripeApiKey}/> */}
            <CreateProduct />
            <Footer />
        </>
    )
}


