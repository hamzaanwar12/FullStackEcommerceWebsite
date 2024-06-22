import React,{useEffect} from 'react'
import CheckOut from './CheckOut'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


export default function ConfirmOrder() {

  const shippingInfo = useSelector(state => state.shippingInfo)
  const user = useSelector(state => state.signUp.user)
  const login = useSelector(state => state.signUp)
  const cart = useSelector(state => state.cart)
  const navigate = useNavigate()

  // console.log("shippingInfo")
  // console.log(shippingInfo)
  // console.log("user Info")
  // console.log(user)

  const handleProceed = (event)=>
  {
    event.preventDefault()
    navigate("/payment")
  }

  useEffect(() => {
    if (!login.isLogin) navigate("/Login");
  }, []);

  return (
    <>
      <CheckOut activeStep={1} />
      <div className='flex flex-col mmd:flex-row  w-[100%] bsm:w-[90%] justify-between mmd:w-[80%] mx-auto mt-[5%]'>

        <div className='flex flex-col w-[90%] mx-auto mmd:mx-0 mmd:w-[70%] gap-y-14  border-b-2 mmd:border-b-0 mmd:border-r-2 border-slate-500'>
          <div className='flex flex-col gap-y-7'>
            <h1 className='font-roboto text-lg sm2:text-xl mmd:text-3xl font-extrabold'>Shipping Info</h1>
            <div className='flex flex-col text-base sm2:text-lg  mmd:text-xl text-light gap-y-3'>
              <h2 className='font-simpleThree '><span className='font-roboto font-bold'>Name    : </span>{user.firstName + " " + user.lastName}</h2>
              <h2 className='font-simpleThree '><span className='font-roboto font-bold'>Phone   : </span>{shippingInfo.phone}</h2>
              <h2 className='font-simpleThree '><span className='font-roboto font-bold'>Address : </span>{shippingInfo.address}</h2>
            </div>
          </div>

          <div className='flex flex-col w-[90%] mmd:w-[70%]'>
            <h1 className='font-roboto text-lg sm2:text-xl mmd:text-3xl font-extrabold'>Your Cart Items</h1>
            {
              cart && cart.items.map((product,index) =>
                <div key={index} className=" relative  my-5  w-[100%] flex flex-col items-center sm2:flex-row ">
                  <div className=" flex  w-[25%] p-2 h-auto items-center ">
                    <img className= " w-Img h-sImg" src={product.images[0]} alt={product.name} />
                  </div>
                  <div className="flex flex-col w-[100%]">
                    <h1 className='italic font-simpleTwo text-base sm2:text-lg mmd:text-2xl'>{product.name}</h1>
                    <div className=" w-[100%] flex flex-row justify-between items-center text-gray-500 font-roboto ">
                      <h2 className="font-roboto text-sm sm2:text-base mmd:text-xl">PKR {product.price}  </h2>
                      <h2 className='font-roboto text-sm sm2:text-base mmd:text-xl'>x {product.quantity}</h2>
                      <h2 className="font-roboto text-sm sm2:text-base mmd:text-xl"> =  PKR{new Intl.NumberFormat({ style: 'currency', }).format(
                        product.price * product.quantity,
                      )}</h2>
                    </div>
                  </div>

                </div>)
            }

          </div>
        </div>
        <div className='mt-[5%] mmd:mt-[0%] flex flex-col gap-y-10 w-[90%]  mmd:w-[25%] mx-auto'>
          <div className='h-12 flex w-[100%] items-center border-b-2 border-slate-400'>
            <h1 className='font-simpleTwo w-[100%]  text-lg sm2:text-xl mmd:text-2xl text-center  font-extrabold'>Order Summary</h1>
          </div>
          <div className='flex flex-col gap-y-6 pb-5 border-b-2 border-slate-400'>
            <div className='flex flex-row justify-between'>
              <h2 className='font-bold'>SubTotal :</h2>
              <h2>PKR {new Intl.NumberFormat({ style: 'currency', }).format(cart.totalPrice)}</h2>
            </div>
            <div className='flex flex-row justify-between'>
              <h2 className='font-bold'>Shipping Cost :</h2>
              <h2>PKR 0</h2>
            </div>
            <div className='flex flex-row justify-between'>
              <h2 className='font-bold'>GST (18%) :</h2>
              <h2>PKR {cart.totalPrice * 0.18}</h2>
            </div>
          </div>
          <div className="flex flex-col gap-y-7">
            <div className='flex text-xl  flex-row justify-between'>
              <h2 className='font-bold'>Total :</h2>
              <h2>PKR {new Intl.NumberFormat({ style: 'currency', }).format(
                (cart.totalPrice + (cart.totalPrice * 0.18)),
              )} </h2>
            </div>
            <button className='bg-red-500 text-center w-2/3 sm2:w-1/2 mx-auto mmd:mx-0 mmd:w-[100%] text-xl font-semibold text-white  rounded-lg text-md p-3 border-r-2 hover:border-2  active:border-none active:bg-red-500 active:text-white hover:text-red-500 hover:border-red-500 hover:bg-white ' onClick={handleProceed}>Proceed</button>
          </div>
        </div>
      </div>

    </>
  )
}
