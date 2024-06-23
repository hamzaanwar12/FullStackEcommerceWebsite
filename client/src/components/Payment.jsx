import React, { useRef } from 'react'
import CheckOut from './CheckOut'
import KeyIcon from '@mui/icons-material/Key';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { CardCvcElement, CardNumberElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useSelector } from 'react-redux';
import { orderActions, sendOrder } from "../store/Order.js"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/Cart.js';
const shippingStyle = {
    form: "w-[35%] font-simpleTwo font-bold italic mx-auto mt-[3%] flex flex-col items-center gap-y-3 rounded-xl py-5 px-2",
    formDiv: "flex items-center w-[98%] text-xl px-2 h-16  mx-auto border-2 border-black",
    input: "w-[50%] mx-auto cursor-pointer text-2xl mt-[10%] font-simpleTwo italic text-lg text-center h-full outline-0 border-none active:outline-0 focus:outline-0 active:border-none focus:border-none",
    button: "bg-red-500 text-center text-xl font-semibold text-white w-[35%]  text-md p-3 border-r-2 hover:border-2  active:border-none active:bg-red-500 active:text-white hover:text-red-500 hover:border-red-500 hover:bg-white w-[98%]",

}


export default function Payment() {

    const shippingInfo = useSelector(state => state.shippingInfo)
    const cart = useSelector(state => state.cart)
    const user = useSelector(state => state.signUp.user)

    const payBtn = useRef(null)
    const stripe = useStripe()
    const elements = useElements()
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // console.log("shippingInfo in Payment")
    // console.log(shippingInfo)

    // console.log("stripeKey")
    // console.log(stripeApiKey)

    /*
    const handleSubmit = async (event) => {
        event.preventDefault()
        payBtn.current.disabled = true
        const paymentData = 
        {
            ...cart,
            ...shippingInfo,
        }
        try {
            console.log(paymentData)
            console.log("Doing it ")
            const check = await fetch("http://localhost:5000/paymentProcess",
                {
                    method: "post",
                    body: JSON.stringify({paymentData}),
                    headers: {
                        Authorization: `Bearer sk_test_51OR8oBSAX1a9EF1btqQoSTZxd0hezWXAVzDUtyBurpp3n59Jvx10IzsNp5I6yEgCqzwHhKcM1uOS7NRuTTvqXbjw00PJ0lmVaB`,
                        "Content-Type": "application/json",
                    },
                })
            const result = await check.json()
            console.log("result of Payment")
            console.log(result)

            if(!stripe || !elements)
            {
                console.log("Could NOt Proceed")
                return
            }

            const proceed = await stripe.confirmCardPayment(result.client_secret,{
                payment_method:{
                    card:elements.getElement(CardNumberElement),
                    billing_details:{
                        name:user.firstName + " " + user.lastName,
                        email:user.email,
                        address:{
                            line1:shippingInfo.address,
                            city:shippingInfo.city,
                            state:shippingInfo.state,
                            postal_code:shippingInfo.pinCode,
                            country:shippingInfo.country,
                        }
                    }
                }
            })
            if(proceed.error)
            {
                payBtn.current.disabled = false
                console.log("Error in Proceed")
            }
            else{
                console.log(proceed)
                if(proceed.paymentIntent.status === "succeeded")
                {
                    // const orders = await 
                }
            }

        }
        catch (error){
            payBtn.current.disabled = false
            console.log("error in Checking Process")
            console.log(error)
            console.log(error.message)
        }

    }
    */

    const handleSubmit = async (event) => {
        event.preventDefault()
        payBtn.current.disabled = true


        const OrderData =
        {
            ...cart,
            ...shippingInfo,
            orderDate: new Date(),
            status: "pending",
            userId: user._id
        }

        // console.log(OrderData)

        try {

            dispatch(sendOrder(OrderData))
            dispatch(cartActions.replaceCart(
                {
                    totalItems: 0,
                    items: [],
                    totalPrice: 0
                }))
            payBtn.current.disabled = false
            // dispatch(sendOrder(OrderData))
        }
        catch (error) {
            console.log("error aik wari Phir")
            console.log(error )

        }


        navigate("/orders")

    }

    return (
        <>
            <CheckOut activeStep={2} />
            <form className={shippingStyle.form} onSubmit={handleSubmit}>
                <div className='h-20 flex flex-row w-[100%] mx-auto p-2 justify-center items-center'>
                    <h2 className='text-3xl font-extrabold'>Card Info</h2>
                </div>
                {/* <Elements stripe={loadStripe("pk_test_51OR8oBSAX1a9EF1bK5hMGgS3WqtozcmR5R3UBVDP7vuFqOzThuCL9jXiNz811CyzMIDTNPXdW1xFBlH768sZt2eG00d24TAiWt")}> */}


                <div className={shippingStyle.formDiv}>
                    <CreditCardIcon />
                    <CardNumberElement className={shippingStyle.input} />

                </div>

                <div className={shippingStyle.formDiv}>
                    <CalendarTodayIcon />
                    <CardExpiryElement className={shippingStyle.input} />
                </div>

                <div className={shippingStyle.formDiv}>
                    <KeyIcon />
                    <CardCvcElement className={shippingStyle.input} />
                </div>

                <button type='submit' ref={payBtn} className={shippingStyle.button}>{`Pay - Rs ${new Intl.NumberFormat({ style: 'currency', }).format(cart.totalPrice,)}`}</button>
                {/*
                <input
                    type='submit'
                    value={`Pay - Rs ${new Intl.NumberFormat({ style: 'currency', }).format(cart.totalPrice,)}`}
                    className={shippingStyle.button}
                    ref={payBtn}
                />
                */}
            </form>
        </>
    )
}
