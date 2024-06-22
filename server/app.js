import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import { config } from "dotenv";
import errorMiddleware from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import productRouter from "./routes/Products.js";
import { dbConnect } from "./database.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/order.js";

const app = express();

config({
    path: "./config/config.env",
});

// Apply CORS middleware before other middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true
}));

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(errorMiddleware);

app.use(userRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(orderRouter);
// app.use(paymentRouter);

app.get("/", (req, res) => res.send(`Working at ${req.url}`));

export default app;

const connectAndCollect = (collection) => {
    const db = dbConnect();
    return db.collection(collection);        
}

export { connectAndCollect };
