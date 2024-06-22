import express from "express"
import { RemoveProduct, RegisterProduct, updateProduct, getProducts } from "../controllers/ControlProducts.js";

const router = express.Router()


router.put("/updateProduct",updateProduct)
router.post("/addProduct", RegisterProduct);
router.post("/removeProduct", RemoveProduct);
router.get("/allProducts", getProducts);

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong in Product Route!');
});

export default router

