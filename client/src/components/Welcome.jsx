import { TfiMouse } from "react-icons/tfi";
import Products from "./Products";
import "./Welcome.css"

const Welcome = () => {

    return (
        <>
            {/* w-[140%] bg-background  md:p-0  md: */}
            <div className = "flex items-center">
            <div className="welcome font-roboto flex flex-col text-center items-center text-white">
            <div className = "flex h-[100%] items-center">

                <div className="h-[25%] flex flex-col gap-y-6 ">
                    <h2 className="w-[100%] text-center text-xl sm2:text-3xl  mmd:text-5xl">Welcome to Ecommerce</h2>
                    <h1 className=" font-extrabold mt-7 text-xl sm2:text-2xl  ">Find the Amazing Products Below</h1>
                    <a href="#products">
                        <button className="mt-2 w-[50%] mx-auto border-0 hover:border-2 box-border h-16 w-15 text-center text-background bg-white active:text-background active:bg-white  gap-x-2  justify-center hover:text-white hover:border-white hover:bg-background flex flex-row items-center">Scroll <TfiMouse /></button>
                    </a>
                </div>
            </div>
            </div>
            </div>
            <div className="shadow-black shadow-lg h-20 flex flex-row w-[70%] sm2:w-[55%] md:w-[45%] mx-auto p-2 justify-center items-center">
                <h1 className=" text-center font-roboto font-extrabold text-xl sm2:text-2xl  mmd:text-4xl w-[100%] ">Featured Products</h1>
            </div>
            <Products />
        </>
    )
}

export default Welcome