import express from "express"
import { updateCart, addCart, getCart, getCartByUser, getAllCarts,deleteCart} from "../controllers/ControlCart.js"

const router = express.Router()

router.post("/updateCart",updateCart)
router.post("/addCart",addCart);
router.post("/getCart",getCart);
router.post("/getCartByUser",getCartByUser);
router.get("/getallCarts",getAllCarts);
router.post("/deleteCart",deleteCart);

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong in Cart Route!');
});

export default router



