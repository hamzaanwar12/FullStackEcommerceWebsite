import { useSelector } from "react-redux";
import { passwordChange } from "../schema/index"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { changeStyle } from "../components/styl.js"
import "./ChangePassword.css"

const initialValues = {
    password: '',
    newPassword: ''
}

export default function ChangePassword({close}) {


    const [visibility, setVisibility] = useState(false)
    const [newvisibility, setNewVisibility] = useState(false)
    const [error, setError] = useState(null)
    
    const navigate = useNavigate()
    const user = useSelector(state => state.signUp.user)
    
    // console.log("Change Password")
    // console.log(user)

    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues,
        validationSchema: passwordChange,
        onSubmit: async (values) => {

            const newValues = { ...values, userName: user.userName,_id:user._id }
            // console.log("newValues")
            // console.log(newValues)

            // console.log("values passed the Schema Update")
            // console.log(newValues)


            try {
                const result = await fetch(`https://full-stack-ecommerce-website-server.vercel.app/user/updatePassword`, {
                    method: "post",
                    body: JSON.stringify(newValues),
                    headers: {
                        "Content-Type": "application/json"
                    },
                })

                const check = await result.json()
                console.log(check)
                if (check.status == 200)
                {
                    // console.log("User Updated")
                    // console.log(check)
                    // console.log({
                    //     isLogin: true,
                    //     user: check
                    // })
                    close()
                }
                else {
                    setError(check.message)
                }
            }
            catch (error) {
                console.log("error.message")
                console.log(error)
            }
        }
    })


    return (
        <form onSubmit={handleSubmit} className={changeStyle.form}>
            <h1 className="text-black font-simpleTwo font-extrabold text-lg sm2:text-2xl mmd:text-4xl">Change Password</h1>

            <div className={changeStyle.formDiv}>
                <div>
                    <div className="flex w-[100%] justify-between">
                        <label htmlFor="">Previous Pasword</label>
                        <span onClick={() => setVisibility(visibility => !visibility)}><FontAwesomeIcon icon={visibility ? faEye : faEyeSlash} /></span>
                    </div>
                    <input name="password"
                        id="password"
                        className={changeStyle.specialInput}
                        value={values.password} onChange={handleChange}
                        onBlur={handleBlur}
                        type={visibility ? "text" : "password"}
                        required />
                    {errors.password && touched.password && <div className={changeStyle.errorDiv}>*{errors.password}</div>}
                </div>
                <div className={changeStyle.formDiv}>
                    <div className="flex w-[100%] justify-between">
                        <label htmlFor="">New Password</label>
                        <span onClick={() => setNewVisibility(newVisibility => !newVisibility)}><FontAwesomeIcon icon={visibility ? faEye : faEyeSlash} /></span>
                    </div>

                    <input name="newPassword"
                        id="newPassword"
                        className={changeStyle.specialInput}
                        value={values.newPassword} onChange={handleChange}
                        onBlur={handleBlur}
                        type={newvisibility ? "text" : "password"}
                        required />
                    {errors.newPassword && touched.newPassword && <div className={changeStyle.errorDiv}>*{errors.newPassword}</div>}
                </div>
            </div>
            {error && <div className={changeStyle.errorDiv}>*{error}</div>}
            <button type="submit" className="h-8 w-[100%] mx-auto mmd:w-[50%] mmd:h-12 rounded hover:bg-white  hover:text-black hover:border-black hover:border-2  active:bg-black active:text-white  bg-black text-white">Save Changes</button>
        </form>
    )
}
