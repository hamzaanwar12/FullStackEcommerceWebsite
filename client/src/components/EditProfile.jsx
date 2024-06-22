import { useSelector } from "react-redux";
import { EditSchema } from "../schema/index"
import { EditStyle } from "../components/styl.js"
import { useState } from "react";
import { useFormik } from "formik"
import { IoMdMail } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { SignUpActions } from "../store/SignUpSlice.js"
import { useDispatch } from "react-redux";
import "./EditProfile.css"
const initialValues = {
    userName: '',
    email: '',
}

export default function EditProfile({close}) {
    
    const [error, setError] = useState(null)
    const [avatar, setAvatar] = useState(previousUser.avatar)
    const previousUser = useSelector(state => state.signUp.user)
    const dispatch = useDispatch()


    // console.log("previousUser")
    // console.log(previousUser)

    const handleFileChange = (event) => {
        // console.log("here We")
        event.preventDefault();

        const reader = new FileReader();

        reader.onload = () => 
        {
            if (reader.readyState === 2) 
            {
                // console.log("Image reader");
                // console.log(reader.result);
                setAvatar(reader.result);
            }
        };
        
        if (event.target.files && event.target.files.length > 0) {
            reader.readAsDataURL(event.target.files[0]);
        }
    };




    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues,
        validationSchema: EditSchema,
        onSubmit: async (values) => {
            const newValues = 
            {
                previous: previousUser,
                newOne: { ...values, avatar: avatar }
            }

            // console.log("values passed to Server")
            // console.log(newValues)


            try {
                const result = await fetch(`https://full-stack-ecommerce-website-server.vercel.app/user/updateUserProfile`, {
                    method: "post",
                    body: JSON.stringify(newValues),
                    headers: {
                        "Content-Type": "application/json"
                    },
                })

                const check = await result.json()
               
                // console.log("check")
                // console.log(check)
               
                if (check.statusCode == 200) 
                {
                    // console.log("User Updated")
                    // console.log(check)

                    dispatch(SignUpActions.loginUser({
                        user: {
                            ...previousUser,
                            userName: newValues.newOne.userName,
                            email: newValues.newOne.email,
                            avatar:  check.avatar
                        }
                    }))
                    // console.log({
                    //     isLogin: true,
                    //     user: check
                    // })
                    close()
                }
                else {
                    setError(check.message)
                    // console.log("check.message")
                    // console.log(check)
                }
            }
            catch (error) {
                console.log("error.message")
                console.log(error)
            }
        }
    })

    return (
        <form className={EditStyle.form} onSubmit={handleSubmit}>
            <div className="mt-2 text-base sm:text-xl mmd:text-3xl font-bold">
                <h1 className=" "> Edit Profile </h1>
            </div>

            <div className={EditStyle.formDiv}>
                <FaUser />
                <input className={EditStyle.input}
                    name="userName"
                    type="text"
                    placeholder={previousUser.userName}
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required />
            </div>
            {errors.userName && touched.userName && <div className={EditStyle.errorDiv}>*{errors.userName}</div>}


            <div className={EditStyle.formDiv}>
                <IoMdMail className="text-xl" />
                <input name="email"
                    className={EditStyle.input}
                    placeholder={previousUser.email}
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required />
            </div>
            {errors.email && touched.email && <div className={EditStyle.errorDiv}>*{errors.email}</div>}



            <div className= "w-[100%] mmd:w-[98%] flex text-xs flex-row items-center justify-left">
                <img className="ml-0 mmd:ml-2 mr-2 h-12 w-12 sm:h-20 sm:w-20 rounded-[50%]  " src={avatar} alt="" />
                <input type="file" accept="image/" onChange={handleFileChange} />
            </div>

            <button type="submit" className={EditStyle.button}>Submit</button>
        </form>

    )
}
