import catchAsyncAwait from "../middlewares/catchAsyncAwait.js"
import stripePackage from 'stripe';

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY)

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
// const catchAsyncAwait = require("../middlewares/catchAsyncAwait.js")
// console.log(catchAsyncAwait)

const processPayment = catchAsyncAwait(async (req, res, next) => {
    console.log(req.body)
    // console.log("process.env.STRIPE_SECRET_KEY : "+process.env.STRIPE_SECRET_KEY)

    // console.log("stripe")
    console.log(stripe)



    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.totalPrice,
        currency: "inr",
        metadata: {
            company: "Ecomerce"
        },
    })
    res.status(200).json({ 
        success: "true",
        client_secret:myPayment.client_secret
    })
})

const sendStripeApiKey =   catchAsyncAwait(async(req,res,next)=>
{
    // console.log("Here We")
    res.status(200).json({stripeApiKey:process.env.STRIPE_API_KEY,secretKey:process.env.STRIPE_SECRET_KEY})
})

export default processPayment
export {sendStripeApiKey}