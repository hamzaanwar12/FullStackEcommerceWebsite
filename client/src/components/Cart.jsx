import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { cartActions, sendData } from "../store/Cart";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// let check = false

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.signUp);
  const cart = useSelector((state) => state.cart);
  
  const [check, setCheck] = useState(false);
  
//   console.log("In the cart Component");
//   console.log(cart);

  useEffect(() => 
    {
        if (!user.isLogin)
            navigate("/Login");
        else
        {

            if (!check) 
            {
                setCheck(true);
            } 
            else if (check) 
            {
                dispatch(sendData(cart));
                // console.log("After Sending in Cart");
                // console.log(cart);
            }
        }
  }, [cart]);

  const handleOrder = (event) => {
    event.preventDefault();
    navigate("/Shipping");
  };

  const emptyHandler = (event) => {
    event.preventDefault();
    dispatch(
      cartActions.replaceCart({
        totalItems: 0,
        items: [],
        totalPrice: 0,
      })
    );
  };

  return (
    <>
      <div className="flex-col mt-[5%] w-[99%] sm:w-[90%] mmd:w-[75%]  mx-auto mb-[1%] box-border border-e-8 border-background px-1">
        <div className="bg-background box-border text-white shadow-slate-400  shadow-md  h-16 mmd:h-20 flex flex-row w-[100%] mx-auto p-2 justify-center items-center">
          <h1 className=" text-left font-simpleTwo font-extrabold text-xl mmd:text-2xl w-[100%] text-red-650">
            Your Cart
          </h1>
        </div>

        <div className="mt-[5%] flex box-border flex-col">
          {(cart.items.length > 0 &&
            cart.items.map((product) => (
              <CartItem key={product._id} product={product} />
            ))) ||
            (cart.items.length === 0 && (
              <div className="bg-background box-border text-white shadow-slate-400 shadow-md h-12 mmd:h-20 flex flex-row w-[100%] mx-auto p-2 justify-center items-center">
                <h1 className=" text-left font-simpleTwo font-extrabold text-md mmd:text-xl w-[100%] mx-auto text-red-650">
                  Cart is Empty
                </h1>
              </div>
            ))}
        </div>

        <div className="shadow-slate-400  shadow-md box-border  px-2 mt-[5%] h-buttons rounded-xl flex items-center bg-background  text-white">
          <div className="min-h-[80%] py-2 w-[100%] gap-y-4 mx-auto flex flex-col box-border">
            <h1 className="text-white font-simpleTwo font-extrabold text-base msm:text-xl sm:text-2xl mmd:text-3xl">
              Summary
            </h1>
            <div className="flex flex-col gap-y-3">
              <h1 className="text-white font-simpleTwo font-bold text-sm msm:text-base mmd:text-xl">
                Total Items : {cart.totalItems}
              </h1>
              <h1 className="text-white font-simpleTwo font-bold text-sm msm:text-base mmd:text-xl">
                Total Price : PKR{" "}
                {new Intl.NumberFormat({ style: "currency" }).format(
                  cart.totalPrice
                )}
              </h1>
            </div>
            <div className="w-[100%] bottom-2 box-border py-2 sm:py-0 font-roboto text-base mmd:text-lg mx-auto flex flex-col items-center sm:flex-row justify-center mmd:justify-end">
              <button
                onClick={emptyHandler}
                className="mx-4 text-center  w-[90%] ssm:w-[75%] my-1 sm:my-0 sm:w-[45%] mmd:w-[20%] text-red-600 rounded-lg text-md  py-2 active:bg-white active:text-red-600  hover:bg-red-500   hover:text-white bg-white "
              >
                Empty Cart
              </button>
              <button
                onClick={handleOrder}
                className="mx-4 text-center  w-[90%] ssm:w-[75%] my-1 sm:my-0 sm:w-[45%] mmd:w-[20%] text-red-600 rounded-lg text-md  py-2 active:bg-white active:text-red-600    hover:bg-red-500  hover:text-white   bg-white "
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
