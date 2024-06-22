import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { useState } from "react"
import regstrationSchema from "../schema"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import style from "./styl"
import profile from "../assets/profile.png"
import { useSelector, useDispatch } from "react-redux"
import { SignUpActions } from "../store/SignUpSlice"
import { cartActions } from "../store/Cart"
import "./Registration.css"


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

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const signup = useSelector(state => state.signUp)

    // console.log("signup")
    // console.log(signup)
    const [avatar, setAvatar] = useState(profile)
    const [visibility, setVisibility] = useState(false)
    const [error, setError] = useState(null)

    const handleFileChange = (event) => {
        // console.log("here We")
        event.preventDefault();
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                console.log("Image reader");
                console.log(reader.result);
                setAvatar(reader.result);
            }
        };

        // Ensure that there is a file before attempting to read it
        if (event.target.files && event.target.files.length > 0) {
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues,
        validationSchema: regstrationSchema,
        onSubmit: async (values) => {
            const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
            console.log("Entered Values are correct")
            delete values.confirmPassword
        
            // let UserValues = { ...values, role: "user" }
            let date = new Date()

            // let UserValues = { ...values, role: "admin", dateJoined:date.getDate()+" "+months[date.getMonth()]+" "+date.getFullYear() }
            let UserValues = { ...values, role: "user", dateJoined:date.getDate()+" "+months[date.getMonth()]+" "+date.getFullYear() }
        
            // console.log("That's Going")
            // console.log(values)

            try {
                const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/registration`, {
                    method: "post",
                    // body: JSON.stringify({...values,avatar:avatar}),
                    body: JSON.stringify({...UserValues,avatar:avatar}),
                    headers: {
                        "Content-Type": "application/json"
                    },
                })

                const check = await result.json()

                if (check.status != 200) {
                    setError(check.message)
                }
                else {
                    dispatch(SignUpActions.loginUser({
                        isLogin: true,
                        user: {...check.user},
                        message: "Sign Up Successful"
                    }))

                    if (values.role != "admin") 
                    {
                        try {
                            const cartResult = await fetch(`${process.env.REACT_APP_BACKEND_URL}/addCart`, {
                                method: "post",
                                body: JSON.stringify({
                                    userId: check.id,
                                    totalItems: 0,
                                    items: [],
                                    totalPrice: 0
                                }),
                                headers: {
                                    "Content-Type": "application/json"
                                },
                            })

                            const newResult = await cartResult.json()

                            if (newResult.status === 200) {
                                dispatch(cartActions.replaceCart({
                                    _id: newResult.id,
                                    userId: check.id,
                                    totalItems: 0,
                                    items: [],
                                    totalPrice: 0,
                                }))
                            }
                        }
                        catch (error) {
                            console.log(error)
                            console.log("error in Adding Cart")
                        }
                    }

                    navigate("/Home")
                }
            }
            catch (error) {
                console.log(error)
                console.log("error in Adding User")
            }
        }
    });

    return (
        <div className={`all flex flex-row py-[5%] items-center w-[100%] mx-auto p-1 mmd:p-4`}>
            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.formDiv}>
                    <label htmlFor="firstName">First Name</label>
                    <input className={style.input}
                        name="firstName"
                        type="text"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required />
                    {errors.firstName && touched.firstName && <div className={style.errorDiv}>*{errors.firstName}</div>}

                </div>

                <div className={style.formDiv}>
                    <label htmlFor="lastName">Last Name</label>
                    <input name="lastName"
                        className={style.input}
                        type="text"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required />
                    {errors.lastName && touched.lastName && <div className={style.errorDiv}>*{errors.lastName}</div>}

                </div>

                <div className={style.formDiv}>
                    <label htmlFor="userName">User Name</label>
                    <input className={style.input}
                        name="userName"
                        type="text"
                        value={values.userName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required />
                    {errors.userName && touched.userName && <div className={style.errorDiv}>*{errors.userName}</div>}

                </div>


                <div className={style.formDiv}>
                    <div>
                        <div className="flex w-[100%] justify-between">
                            <label htmlFor="">Pasword</label>
                            <span onClick={() => setVisibility(visibility => !visibility)}><FontAwesomeIcon icon={visibility ? faEye : faEyeSlash} /></span>
                        </div>

                        <input name="password"
                            id="password"
                            className={style.specialInput}
                            value={values.password} onChange={handleChange}
                            onBlur={handleBlur}
                            type={visibility ? "text" : "password"}
                            required />
                        {errors.password && touched.password && <div className={style.errorDiv}>*{errors.password}</div>}
                    </div>
                </div>


                <div className={style.formDiv}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input name="confirmPassword"
                        id="confirmPassword"
                        className={style.input}
                        type="password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur} required />
                    {errors.confirmPassword && touched.confirmPassword && <div className={style.errorDiv}>*{errors.confirmPassword}</div>}
                </div>


                <div className={style.formDiv}>
                    <label htmlFor="">Email</label>
                    <input name="email"
                        className={style.input}
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required />
                    {errors.email && touched.email && <div className={style.errorDiv}>*{errors.email}</div>}
                </div>


                <div className={style.formDiv}>
                    <label htmlFor="">CNIC<span className="ml-2 text-sm text-gray-500  ">(35XXX-XXXXXXX-X)</span></label>
                    <input name="cnic"
                        className={style.input}
                        value={values.cnic}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required />
                    {errors.cnic && touched.cnic && <div className={style.errorDiv}>*{errors.cnic}</div>}
                </div>
                {error && <div className={style.errorDiv}>*{error}</div>}

                {
                 <div className="w-[100%] mmd:w-[50%] text-sm mmd:text-lg flex flex-row items-center justify-between">
                    <img className="w-12 h-12 mmd:w-20 mmd:h-20 rounded-[50%]  "  src={avatar} alt=""  />
                    <input className=" text-xs mmd:text-lg" type="file" accept="image/" onChange={handleFileChange} />
                </div>
                }
                <button type="submit" className={style.button}>Register</button>
            </form>
            <span><a className="text-white" href="/Login">Have an Account?</a></span>

            {/* <div >
                <img className="w-[80%] h-[70%] bg-center" src={DeliverySuccess} alt="notfound" />
            </div> */}
        </div>
    )
}

export default RegistrationForm