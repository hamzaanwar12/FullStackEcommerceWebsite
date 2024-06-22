import mongoose from "mongoose"

const schema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    userName:String,
    pasword:String,
    email:String,
    cnic:String,
})


const Users = mongoose.model("Users",schema)



export default Users