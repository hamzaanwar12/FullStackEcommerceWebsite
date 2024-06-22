import Header from "../components/Header";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import UserOptions from "../components/UserOptions";

const CartPage = () => {
   
    return (
        <>
            <Header />
            {/* <UserOptions className="relative top-7 left-[45%]"/> */}
            <UserOptions />
            <Cart/>
            <Footer/>
        </>
    )
}

export default CartPage