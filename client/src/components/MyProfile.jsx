import Header from "../components/Header"
import { useSelector } from "react-redux";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import ChangePassword from "../components/ChangePassword"
import EditProfile from "./EditProfile";
  
const MyProfile = () => {
    const user = useSelector(state => state.signUp)
    const navigate = useNavigate()
    useEffect(() => {
      if (!user.isLogin)
         navigate("/Login");
    }, []);

    // console.log("My Profile")
    // console.log(user)

    const handleOrders = ()=>
        {
            navigate("/orders")
        }
    
    return (

            <div className="mt-[5%] flex  items-center flex-col sm:flex-row justify-between w-[100%] sm:w-[90%]   mx-auto overflow-none">
                <div className="flex flex-col  items-center gap-y-4 mmd:gap-y-7  w-[100%] sm:w-[60%] overflow-hidden">
                    <div>
                        <h1 className="text-center font-simpleTwo font-extrabold text-2xl mmd:text-4xl w-[100%]">My Profile</h1>
                    </div>
                    {/* style={{background:`url(${user.user.avatar})`,
                    position:"center",
                    backgroundSize:"cover",
                    backgroundRepeat:"no-repeat",
                    height:"15rem",
                    width:"15rem",
                    borderRadius:"50%"}} */}
                    <div >
                        <img className="h-Img w-Img msm:h-check2 msm:w-check2 sm:h-buttons sm:w-buttons mmd:h-check2 mmd:w-check2 self-center rounded-[50%]" src={user.user.avatar} alt="" />
                    </div>
                    
                    <Popup className="border-none"
                        trigger={
                            <button className="bg-red-500 text-center text-md mmd:text-xl font-semibold text-white w-[70%] mx-auto sm:w-[50%] md:w-[45%] mmd:w-[35%] rounded-lg text-md p-3 border-r-2 hover:border-2  active:border-none active:bg-red-500 active:text-white hover:text-red-500 hover:border-red-500 hover:bg-white ">Edit Profile</button>
                        }
                        modal
                        nested
                    >
                        {close => (
                            <EditProfile close={close} />
                        )}
                    </Popup>
                </div>

                <div className="flex flex-col items-center mx-auto w-[95%]  sm:px-0 sm:items-start gap-y-0 mt-[5%] sm:mt-0   sm:w-[38%] overflow-hidden">
                    <div className="w-[100%]  sm:w-auto  flex flex-col gap-y-2 mmd:gap-y-1 font-simpleTwo">
                        <h1 className="text-black font-simpleTwo font-extrabold text-xl mmd:text-2xl">User Name</h1>
                        <h2 className="text-gray-800 font-semibold font-simpleTwo  text-lg mmd:text-xl">{user.user.userName} </h2>
                    </div>

                    <div className="w-[100%]  sm:w-auto mt-[9%] flex gap-y-2 flex-col font-simpleTwo">
                        <h1 className="font-simpleTwo font-extrabold text-xl mmd:text-2xl">Email</h1>
                        <h2 className="text-gray-800 font-semibold font-simpleTwo  text-md mmd:text-lg">{user.user.email}</h2>
                    </div>
                    <div className="w-[100%]  sm:w-auto  mt-[9%]  gap-y-2 mmd:gap-y-1 flex flex-col font-simpleTwo">
                        <h1 className="font-simpleTwo font-extrabold text-xl mmd:text-2xl">Date Joined</h1>
                        <h2 className="text-gray-800 font-semibold font-simpleTwo  text-md mmd:text-lg"> {user.user.dateJoined}</h2>
                    </div>
                    <div className="mt-[9%] w-[100%] gap-y-3 mmd:gap-y-5 text-center msm:text-md mmd:text-xl font-semibold flex flex-col font-simpleTwo">
                        <button onClick={handleOrders} className= "w-[80%] sm:mx-0 mmd:w-sRecentCard sm:w-cardImg sm:px-2  h-9 mmd:h-12 hover:bg-white hover:text-black hover:border-black hover:border-2  active:bg-black active:text-white  bg-black text-white">My Orders</button>

                        <Popup
                            trigger={
                                <button className=" w-[80%]  sm:mx-0 mmd:w-sRecentCard sm:w-cardImg sm:px-2 h-9 mmd:h-12 hover:bg-white hover:text-black hover:border-black hover:border-2  active:bg-black active:text-white bg-black text-white">Change Password</button>
                            }
                            modal
                            nested
                        >
                            {close => (
                                <ChangePassword close={close} />
                            )}
                        </Popup>

                    </div>
                </div>
            </div>
        
    )
}


export default MyProfile