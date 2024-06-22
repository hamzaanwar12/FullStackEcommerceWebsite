import express from "express"
import processPayment from "../controllers/ControlPayment.js"
import { sendStripeApiKey } from "../controllers/ControlPayment.js"

const router = express.Router()


router.post("/paymentProcess",processPayment)
router.get("/getStripeApiKey",sendStripeApiKey)

export default router