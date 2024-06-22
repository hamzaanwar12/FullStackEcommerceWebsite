import signUpSchema from "./schema/index"
import { useState } from "react";
import { useFormik } from 'formik';
import style from "./style";

const initialValues = {
    password: '',
    email: '',
}



const Login = () => {


    const [error, setError] = useState(null)

    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({

        initialValues: initialValues,
        onSubmit: (values)=>console.log(values)
    });


    return (
        <form className={`text-white flex flex-wrap flex-col justify-between mx-auto center  w-[45%] p-5 h-auto center shadow-lg shadow-gray-500/50 rounded-3xl  space-y-7 backdrop-blur-md mt-16`} onSubmit={handleSubmit}>
            <div className={style.specialDaughterDiv + 'w-[100%]'}>
                <label className={style.label} htmlFor="email">Email Address</label>
                <input
                    className={style.input + " w-[100%]"}
                    autoComplete='off'
                    id="email"
                    name="email"
                    type="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    required
                />
                {errors.email && touched.email && <div className={style.errorDiv}>*{errors.email}</div>}
            </div>

            <div className={style.specialDiv}>
                <div className={style.specialDaughterDiv + 'w-[100%]'}>
                    <label className={style.label} htmlFor="password">Password</label>
                    <input
                        className={style.input + " w-[100%]"}
                        id="password"
                        name="password"
                        autoComplete='off'
                        type="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        required
                    />
                    {errors.password && touched.password && <div className={style.errorDiv}>*{errors.password}</div>}
                </div>

            </div>
            {error && <div className={style.errorDiv}>*{error}</div>}
            <button className={" bg-white text-black h-14   w-[100%] hover:bg-black hover:text-white active:text-red-700 active:bg-transparent active:border-2 active:border-black  text-xl  font-mono rounded-xl mt-3"} onClick={()=>console.log(values)} type="submit ">Login In</button>
        </form>

    )

}

export default Login