import { Link } from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/Cart";
import { ProductActions } from "../store/ProductSlice";

const CartItem = ({ product }) => {

    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(product.quantity)
    const AvailableProducts = useSelector(state => state.products.products)

    // console.log(AvailableProducts)

    const getIndex = (id) => {
        console.log(AvailableProducts)
        const index = AvailableProducts.findIndex(element => element._id === id)
        return index
    }

    const addHandler = (event) => {

        event.preventDefault()
        let quantityNum = parseInt(quantity)
        if (quantityNum < AvailableProducts[getIndex(product._id)].quantity) {
            setQuantity(parseInt(quantity) + 1)
            dispatch(cartActions.addToCart({ ...product, quantity: quantity }))
        }
        else {
            alert("This Products is not available in Such Volume")
        }
    }

    const subtractHandler = (event) => {
        event.preventDefault()
        let quantityNum = parseInt(quantity)
        if (quantityNum > 1) 
        {
            setQuantity(quantityNum - 1)
            dispatch(cartActions.removeFromCart(product))
        }
        else if(quantityNum == 1)
        {
            dispatch(cartActions.removeItem({ ...product, quantity: quantity }))
        }
    }

    const cancelCartItem = (event) => {
        event.preventDefault()
        console.log({ ...product, quantity: quantity })
        dispatch(cartActions.removeItem({ ...product, quantity: quantity }))
    }


    // console.log(product)
    return (
        <Link to={`/product/${product._id}`} className=" relative bg-background  hover:scale-y-105 w-[100%] items-center box-border flex flex-col my-3 py-1 sm:py-0 sm:flex-row  shadow-black shadow-lg rounded-xl">
            <button className="absolute right-3 z-50 top-2 text-red-500 hover:text-black text-2xl" onClick={cancelCartItem}>X</button>
            <div className="mx-auto Z-40 sm:mx-0 flex W-[97%] msm:w-[50%] sm:w-[25%] p-2 h-auto items-center ">
                <img className="w-[100%] msm:w-Img h-Img sm:w-image sm:h-image" src={product.images[0]} alt={product.name} />
            </div>

            <div className="mx-auto w-[100%] justify-between sm:w-[75%] flex flex-row sm2:flex-col  gap-y-1  sm:gap-y-3  px-5">
                <div className="w-[35%] sm2:w-[92%] flex flex-col sm2:flex-row text-center items-center justify-between">
                    <h1 className="text-white font-simpleTwo  text-smallFont my-1 sm2:my-0 md:text-xl">{product.name}</h1>
                    <h2 className="text-white font-simpleTwo  text-smallFont my-1 sm2:my-0 md:text-xl">Quantity</h2>
                    <h2 className="text-white font-simpleTwo  text-smallFont my-1 sm2:my-0 md:text-xl">Total</h2>
                </div>
                <div className="w-[50%] sm2:w-[95%] flex flex-col sm2:flex-row  justify-between items-center text-white  font-roboto ">
                    <h2 className="text-white font-simpleTwo text-smallFont my-1 sm2:my-0 md:text-xl">PKR {product.price}</h2>
                    <div className="flex items-center my-1 sm2:my-0">
                        <button className="w-6 h-6 ssm:h-auto ssm:w-8 mmd:w-10 text-smallFont ssm:text-lg mmd:text-2xl cursor-pointer hover:text-red-800 bg-black text-white" onClick={subtractHandler}>-</button>
                        <div className="w-7 h-6 ssm:w-10  mmd:w-14 ssm:h-8 flex flex-row items-center text-center text-black bg-white outline-none hover:outline-none active:outline-none" type="number">
                            <h1 className="w-[100%] text-center">{quantity}</h1>
                        </div>
                        <button className="w-6 h-6 ssm:h-auto ssm:w-8 mmd:w-12 text-smallFont ssm:text-lg mmd:text-2xl bg-black cursor-pointer hover:text-red-800 text-white" onClick={addHandler}>+</button>
                    </div>
                    <h2 className="text-white font-simpleTwo  my-1 sm2:my-0 text-smallFont md:text-xl">PKR {new Intl.NumberFormat({ style: 'currency', }).format(
                        product.price * quantity,
                    )}</h2>
                </div>
            </div>
        </Link>
    )
}

export default CartItem