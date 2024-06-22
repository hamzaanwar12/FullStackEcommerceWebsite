import { createSlice } from "@reduxjs/toolkit"
import me from "../assets/ecommerce images/top1.jpg"

const initialState = {
    isLogin:false,
    user: {},
    message:null
}

/*
const initialState = {
    isLogin: true,
    user: {
        id: "check.user._id",
        firstName: "Muhammad",
        lastName: "Hamza",
        userName: "recky",
        cnic: "35202-5052968-7",
        image:me,
        email:"hamzaNAwar2003@gmail.com",
        dateJoined:"17 Nov 2003"
    },
    message: "User Login"
}
*/

const SignUp = createSlice({
    name: "signup",
    initialState,
    reducers:
    {

        loginUser(state, action) {
            [state.isLogin, state.user, state.message] = [action.payload.isLogin,action.payload.user,action.payload.message]
        },
        logOutUser(state) {
            [state.isLogin, state.user, state.message] = [false, {}, null];
        }

    }
})

const SignUpActions = SignUp.actions
export default SignUp
export { SignUpActions }
