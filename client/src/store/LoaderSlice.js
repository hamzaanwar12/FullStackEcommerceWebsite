import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    loader:false,
}

const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        setLoader(state,action){
            state.loader = action.payload.loader
        },
    }
})

const loaderActions = loaderSlice.actions
export default loaderSlice
export { loaderActions}
