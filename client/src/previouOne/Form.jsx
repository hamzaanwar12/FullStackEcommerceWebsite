import signUpSchema from "./schema/index"
import { useState } from "react";
import { useFormik } from 'formik';
import style from "./style";

const initialValues = {
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    email: '',
    cnic: ''
}


export default function Form() {

    const [error,setError] = useState(null)

    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({

        initialValues: initialValues,
        validationSchema: signUpSchema,

        onSubmit: async (values,{resetForm}) => {
           
            
            await fetch("http://localhost:5000/", {
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
    });


    // Note that we have to initialize ALL of fields with values. These
    // could come from props, but since we don’t want to prefill this form,
    // we just use an empty string. If we don’t do this, React will yell
    // at us.

    return (
        <form className={style.form} onSubmit={handleSubmit}>

            <div className={style.specialDiv}>
                <div className={style.specialDaughterDiv}>
                    <label className={style.label} htmlFor="firstName">First Name</label>
                    <input
                        className={style.input}
                        autoComplete='off'
                        id="firstName"
                        name="firstName"
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        placeholder='Hamza'
                    />
                    {errors.firstName && touched.firstName && <div className={style.errorDiv}>*{errors.firstName}</div>}
                </div>

                <div className={style.specialDaughterDiv}>
                    <label className={style.label} htmlFor="lastName">Last Name</label>
                    <input
                        className={style.input}
                        autoComplete='off'
                        name="lastName"
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        placeholder='Anwar'
                    />
                    {errors.lastName && touched.lastName && <div className={style.errorDiv}>*{errors.lastName}</div>}
                </div>
            </div>

            <div className={style.specialDiv}>
                {/* <div className={style.div}> */}
                <div className={style.specialDaughterDiv}>
                    <label className={style.label} htmlFor="userName">User Name</label>
                    <input
                        className={style.input}
                        autoComplete='off'
                        id='userName'
                        name="userName"
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.userName}
                        placeholder='Recky'
                    />
                    {errors.userName && touched.userName && <div className={style.errorDiv}>*{errors.userName}</div>}
                </div>

                <div className={style.specialDaughterDiv}>
                    <label className={style.label} htmlFor="email">Email Address</label>
                    <input
                        className={style.input}
                        autoComplete='off'
                        id="email"
                        name="email"
                        type="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                    />
                    {errors.email && touched.email && <div className={style.errorDiv}>*{errors.email}</div>}
                </div>
            </div>

            <div className={style.specialDiv}>
                <div className={style.specialDaughterDiv}>
                    {/* <div className={style.div}> */}
                    <label className={style.label} htmlFor="password">Password</label>
                    <input
                        className={style.input}
                        id="password"
                        name="password"
                        autoComplete='off'
                        type="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                    />
                    {errors.password && touched.password && <div className={style.errorDiv}>*{errors.password}</div>}
                </div>

                <div className={style.specialDaughterDiv}>
                    <label className={style.label} htmlFor="userName">Confirm Password</label>
                    <input
                        className={style.input}
                        id="confirmPassword"
                        autoComplete='off'
                        name="confirmPassword"
                        type="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.confirmPassword}
                    />
                    {errors.confirmPassword && touched.confirmPassword && <div className={style.errorDiv}>*{errors.confirmPassword}</div>}
                </div>
            </div>

            <div className={style.specialDaughterDiv}>
                <label className={style.label} htmlFor="cnic">CNIC</label>
                <input
                    className={style.input}
                    autoComplete='off'
                    name="cnic"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cnic}
                    placeholder='3202-XXXXXXX-X'
                />
                {errors.cnic && touched.cnic && <div className={style.errorDiv}>*{errors.cnic}</div>}
            </div>

            {error && <div className={style.errorDiv}>*{error}</div>}
            <button className={style.button + "mt-3"} type="submit">Sign In</button>
        </form>
    );
};
