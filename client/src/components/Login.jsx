import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { useState } from "react"
import { LoginSchema } from "../schema"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch,useSelector } from "react-redux"
import { SignUpActions } from "../store/SignUpSlice"
import { cartActions } from "../store/Cart.js"
import "./Registration.css"
import style from "./styl.js"
import { fetchUserOrders, fetchOrders } from "../store/Order.js"

const initialValues = {
    userName: '',
    password: '',
}



const LoginForm = () => {

    const cart = useSelector(state => state.cart)
    const [visibility, setVisibility] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()



    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues,
        validationSchema: LoginSchema,

        onSubmit: async (values) => {
            // console.log("Entered Values are correct")
            // console.log(values)

            try {
                const result = await fetch(`https://full-stack-ecommerce-website-server.vercel.app/user/login`, {
                    method: "post",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json"
                    },
                })

                const check = await result.json()
                if (check.status != 200) {
                    setError(check.message)
                }
                else {
                    // console.log("User Found")
                    // console.log(check)

                    dispatch(SignUpActions.loginUser({
                        isLogin: true,
                        user: check.user,
                        message: check.message
                    }))


                    const cartResult = await fetch(`https://full-stack-ecommerce-website-server.vercel.app/getCartByUser`,
                        {
                            method: "post",
                            body: JSON.stringify({
                                _id: check.user._id,
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            },
                        })

                    const checkCart = await cartResult.json()
                    // console.log("checkCart")
                    // console.log(checkCart)
                    if (checkCart.status != 200) {
                        setError(check.message)
                    }
                    else {
                        // console.log("Cart Found")
                        // console.log(checkCart)
                        // console.log({
                        //     isLogin: true,
                        //     cart: checkCart
                        // })
                    }
                    // console.log("Checking cart before replacement")
                    // console.log(checkCart.cart)
                    dispatch(cartActions.replaceCart({ ...checkCart.cart}))
                    // console.log('After Loading the Cart in the Cart')
                
                    navigate("/Home")
                    if (check.user.role == "admin")
                    {
                        // console.log("get All")
                        dispatch(fetchOrders())

                    }
                    else {
                        dispatch(fetchUserOrders(check.user._id))
                    }
                }

            }
            catch (error) {
                console.log(error.message)
                console.log(error)
            }

        }

    });

    return (

        <div className="flex items-center all overflow-y-hidden">
            <form className="font-robot  flex flex-col items-center h-[47%] gap-y-5 mmd:gap-y-12 px-1 mmd:px-5 py-2  w-[95%] md:w-[80%] mmd:w-[55%] box-border m-auto  rounded-3xl drop-shadow-2xl shadow-black-500/50 backdrop-blur-xl " onSubmit={handleSubmit}>
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
                            <label htmlFor="">Password</label>
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

                {error && <div className={style.errorDiv}>*{error}</div>}
                <button type="submit" className={style.button}>Login</button>
                <span><a className="text-white" onClick={navigate("/registration")} >SignUp?</a></span>
            </form>
        </div>
    )
}

export default LoginForm