import * as Yup from "yup";

const regstrationSchema = Yup.object({
    firstName: Yup.string()
        .min(2, "Minimum 2 Characters")
        .max(17, "Maximum 17 Characters")
        .required("First Name is required"),

    lastName: Yup.string()
        .min(2, "Minimum 2 Characters")
        .max(17, "Maximum 17 Characters")
        .required("Last Name is required"),

    userName: Yup.string()
        .min(2, "Minimum 2 Characters")
        .max(17, "Maximum 17 Characters")
        .required("User Name is required"),

    password: Yup.string()
        .min(8, "Too Short! Minimum 8 characters are required")
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#=|])[A-Za-z\d@$!%*?&]{8,}$/,
            "At least 1 Capital, 1 smaller, 1 special character, 1 digit is required"
        )
        .required("Password is required"),

    cnic: Yup.string()
        .matches(/^\d{5}-\d{7}-\d{1}$/, "Invalid CNIC")
        .required("CNIC:3202-XXXXXXX-X"),


    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("E-mail is Required"),
});



const LoginSchema = Yup.object({
    userName: Yup.string()
        .min(2, "Minimum 2 Characters")
        .max(17, "Maximum 17 Characters")
        .required("User Name is required"),

    password: Yup.string()
        .min(8, "Too Short! Minimum 8 characters are required")
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#=|])[A-Za-z\d@$!%*?&]{8,}$/,
            "At least 1 Capital, 1 smaller, 1 special character, 1 digit is required"
        )
        .required("Password is required"),

});

const Reviewchema = Yup.object({
    firstName: Yup.string()
        .min(2, "Minimum 2 Characters")
        .required("Something should be given as a required"),
});

const passwordChange = Yup.object({

    password: Yup.string()
        .min(8, "Too Short! Minimum 8 characters are required")
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#=|])[A-Za-z\d@$!%*?&]{8,}$/,
            "At least 1 Capital, 1 smaller, 1 special character, 1 digit is required"
        )
        .required("Previous Password is required"),

    newPassword: Yup.string()
        .min(8, "Too Short! Minimum 8 characters are required")
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#=|])[A-Za-z\d@$!%*?&]{8,}$/,
            "At least 1 Capital, 1 smaller, 1 special character, 1 digit is required for a new Password"
        )
        .required("New Password is required"),

});


const EditSchema = Yup.object({
    userName: Yup.string()
        .min(2, "Minimum 2 Characters")
        .max(17, "Maximum 17 Characters")
        .required("User Name is required"),

    email: Yup.string()
        .email("Invalid email format")
        .required("E-mail is Required"),
});



export default regstrationSchema;
export { LoginSchema, Reviewchema, passwordChange, EditSchema}

