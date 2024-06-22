import { useFormik } from "formik"
import { useState } from "react"
import regstrationSchema from "../schema"
import DeliverySuccess from "../assets/Payment Success.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const initialValues = {
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    email: '',
    cnic: '',
}



const RegistrationForm = () => {

    const [visibility,setVisibility] = useState(false)
    const [error,setError] = useState(null)
    const [phone,setphoneValue] = useState("")
    const apiUrl = process.env.REACT_APP_BACKEND_URL;

 
    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues,
        validationSchema: regstrationSchema,

        onSubmit: async (values,{resetForm}) => {
            await fetch(`${apiUrl}/`, {
                method: "post",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(res => 
                {
                    console.log("checked")
                    console.log(res)
                    if( res.message)
                        setError(res.message)
                    else
                    {
                        resetForm()
                        setError(null)
                    }
                })
        },
        onSubmit : ()=>console.log("Entered Values are correct")
    });

 
    const checkInput = (event)=>
    {
        // console.log(event)
        // console.log(event.key)
         
        if(((parseInt(event.key)>=0 || parseInt(event.key)<=9) && phone.length<11))
            setphoneValue(phone + event.key)
        else
        {
            if(event.key == "Backspace" && phone!="")
            setphoneValue(phone[0,-2])
        }
    }

    return (
        <div class="flex">
            <form class="flex flex-col items-center gap-y-3 w-[80%] m-auto  rounded-sm" action="/login" method="Post">
                <div class="flex flex-col w-[80%] items-between">
                    <label for="">First Name</label>
                    <input class="border-0 font-thin outline-0 border-b-2" name="firstName" type="text" value={values.firstName} onChange={handleChange} onBlur={handleBlur}
                        required />
                </div>

                <div class="flex flex-col w-[80%] items-between">
                    <label for="">Last Name</label>
                    <input name="lastName" class="border-0 outline-0 border-b-2" type="text" value={values.lastName} onChange={handleChange} onBlur={handleBlur} required />
                </div>

                <div class="flex flex-col w-[80%] items-between">
                    <label for="">Phone Number</label>
                    <input name="phoneNumber" type="tel" value={phone}  onKeyDown={checkInput} onBlur={handleBlur} class="border-0 outline-0 border-b-2" id="phone"  required />
                </div>

                <div class="flex  flex-col w-[80%] gap-y-1 items-between">
                    <label for="">Email</label>
                    <input name="email" class="border-0 outline-0 border-b-2" type="email"  value={values.email} onChange={handleChange} onBlur={handleBlur} required />
                </div>

                <div class="flex  flex-col w-[80%] gap-y-1 items-between">
                    <div>
                        <div className="flex w-[100%] justify-between">
                            <label for="">Pasword</label>
                            <span onClick={()=>setVisibility(visibility=>!visibility)}><FontAwesomeIcon icon={visibility? faEye:faEyeSlash}/></span>
                        </div>

                        <input name="password" id="password" class="border-0 outline-0 border-b-2" value={values.password} onChange={handleChange} onBlur={handleBlur} type={visibility?"text":"password"}
                            required />
                    </div>
                </div>
                
                <div class="flex  flex-col w-[80%] gap-y-1 items-between">
                    <label for="">Confirm Password</label>
                    <input name="confirmPassoword" id="confirmPassoword"  class="border-0 outline-0 border-b-2"  value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur}
                        type="password" required />
                </div>
                
                <button type="submit" class="bg-white font-black rounded-sm border-2 border-indigo-500 ">Register</button>
           
            </form>
           
            <div className="bg-black p-2">
                <img class="w-[50%] h-[60%] bg-center" src={DeliverySuccess} alt="notfound" />
            </div>
        </div>
    )
}

export default RegistrationForm