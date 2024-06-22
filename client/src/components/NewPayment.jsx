import React, { useRef,useEffect } from 'react'
import CheckOut from './CheckOut'
import KeyIcon from '@mui/icons-material/Key';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useSelector } from 'react-redux';
import { sendOrder } from "../store/Order.js"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/Cart.js';

const shippingStyle = {
    form:  "w-[94%] ssm:w-[85%] sm2:w-[60%] md:w-[38%] font-simpleTwo font-normal sm2:font-bold italic mx-auto mt-[3%] flex flex-col items-center gap-y-3 rounded-xl py-5 msm:px-2",
    formDiv: "flex items-center w-[100%]  lg:w-[98%]  lg:px-1 h-10 lg:h-16  mx-auto border-2 border-black",
    input: "w-[100%] cursor-pointer font-simpleTwo italic text-sm msm:text-lg text-center h-full outline-0 border-none active:outline-0 focus:outline-0 active:border-none focus:border-none",
    button: "bg-red-500 text-center text-xl font-semibold text-white w-[100%] mmd:w-[98%]  text-md p-3 border-r-2 hover:border-2  active:border-none active:bg-red-500 active:text-white hover:text-red-500 hover:border-red-500 hover:bg-white",

}


export default function NewPayment() {

    const payBtn = useRef(null)
    const shippingInfo = useSelector(state => state.shippingInfo)
    const cart = useSelector(state => state.cart)
    const login = useSelector(state => state.signUp)
    const user = login.user
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // console.log("shippingInfo in Payment")
    // console.log(shippingInfo)


    const handleSubmit = async (event) => 
    {
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

    useEffect(() => {
       if(!login.isLogin)
        navigate("/Login") 
       
    }, []);

    return (
        <>
            <CheckOut activeStep={2} />
            <form className={shippingStyle.form} onSubmit={handleSubmit}>
                <div className='h-10 sm2:h-15 flex flex-row w-[100%] mx-auto sm2:p-2 justify-center items-center'>
                    <h2 className='text-lg sm2:text-xl mmd:text-3xl font-extrabold'>Card Info</h2>
                </div>
                {/* <Elements stripe={loadStripe("pk_test_51OR8oBSAX1a9EF1bK5hMGgS3WqtozcmR5R3UBVDP7vuFqOzThuCL9jXiNz811CyzMIDTNPXdW1xFBlH768sZt2eG00d24TAiWt")}> */}


                <div className={shippingStyle.formDiv}>
                    <CreditCardIcon />
                    <input placeholder='1234 1234 1234 1234 ' type='number' className={shippingStyle.input} />

                </div>

                <div className={shippingStyle.formDiv}>
                    <CalendarTodayIcon />
                    <input className={shippingStyle.input} />
                </div>

                <div className={shippingStyle.formDiv}>
                    <KeyIcon />
                    <input className={shippingStyle.input} />
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
