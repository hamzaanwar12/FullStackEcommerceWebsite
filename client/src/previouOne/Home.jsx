import style from "./style"
import { useNavigate } from "react-router-dom"
const Home = () => {
    
    const navigate = useNavigate()
    const SignUP=()=>navigate("/signup")
    const Login = ()=>navigate("/login")

    const stye = {
        button:"bg-white w-[70%] text-black h-14  hover:bg-black hover:text-white active:text-red-700 active:bg-transparent active:border-2 active:border-black text-xl font-mono focus:outline-1 outline-slate-500 mx-auto center"
    }
    return (
        <div className="flex flex-col justify-between mx-auto center mt-[6%] w-[90%] md:w-[62%]  md:space-y-5 p-5 text-white h-56 items-center shadow-lg shadow-gray-500/50 rounded-3xl  backdrop-blur-md">
            <h1 className="text-3xl">Where to go?</h1>
            <div className="flex flex-col w-[100%] mt-5 h-auto items-between">
                <button  onClick={SignUP} className= {`${style.button} mb-5`}>Sign Up</button>
                <button onClick={Login} className= {`${style.button}`}>Login Up</button>
            </div>
        </div>
    )
}

export default Home