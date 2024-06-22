import React from 'react'
import Header from '../components/Header'
import UserOptions from '../components/UserOptions'
import Footer from '../components/Footer'
import ConfirmOrder from "../components/ConfirmOrder"

function ConfirmOrderPage() 
{
    return (
        <>
            <Header />
            <UserOptions />
            <ConfirmOrder />
            <Footer />
        </>
    )
}

export default ConfirmOrderPage