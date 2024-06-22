import { useNavigate } from "react-router-dom"
import "./SuccessMessage.css"
import { useDispatch, useSelector } from "react-redux";
import { SignUpActions } from "../store/SignUpSlice";
const SuccessMessage = ()=>
{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const Message = useSelector(state=>state.SignUp.Message)

    const handleClick = (event)=>
    {
        event.preventDefault()
    }
    return (
        <div className={" font-stylish  flex flex-col items-center px-5 py-2 box-border m-auto  rounded-3xl drop-shadow-xl shadow-black-500/50 backdrop-blur-lg w-[50%] h-[25%] gap-y-9"}>
            <h1 className="font-stylish text-lg ">{Message}</h1>
            <p>We Wish you all on your journey here for spending and selling</p>
            <button className="w-[25%] h-12 bg-black  text-xl cursor-pointer text-white rounded-sm border-2   hover:bg-white hover:text-black hover:border-0 focus:bg-transparent focus:text-black focus:border-2 focus:border-black" onClick={handleClick}></button>
        </div>
    )
}


export default SuccessMessage