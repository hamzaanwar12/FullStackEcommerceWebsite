import express from "express"
import { placeOrder,updateOrderStatus ,getAllOrders,getUserOrders} from "../controllers/ControlOrder.js"


const router = express.Router()



router.post("/order/placeOrder", placeOrder);
router.get("/order/getAllOrders", getAllOrders);
router.post("/order/getUserOrders", getUserOrders);
router.post("/order/updateOrderStatus", updateOrderStatus);


export default router