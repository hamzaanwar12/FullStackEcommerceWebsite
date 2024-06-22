import express from "express"
import { RegisterUser, LoginUser, UpdatePassword, UpdateUser,GetAllUsers,DeleteUser } from "../controllers/ControlUsers.js";

const router = express.Router()


router.post("/user/registration",RegisterUser)
router.post("/user/login", LoginUser);
router.post("/user/updatePassword",UpdatePassword)
router.post("/user/updateUserProfile",UpdateUser)
router.post("/user/deleteUser",DeleteUser)
router.get("/user/getAllUsers",GetAllUsers)


router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

export default router

