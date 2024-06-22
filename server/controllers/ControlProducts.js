import { connectAndCollect } from "../app.js"
import { ObjectId } from "mongodb"
import { v2 as cloudinary } from 'cloudinary';

const RegisterProduct = async (req, res) => {
    if (Object.keys(req.body).length !== 0) {

        const collection = connectAndCollect("Products")
        // console.log(req.body)


        let checkImages = []
        let images = req.body.images

        if (typeof (req.body.images) === "string") {
            images = []
            images.push(req.body.images)
        }
        let uploadPromises
        try {
            for (let i = 0; i < images.length; ++i) {
                uploadPromises = images.map((image) =>
                    cloudinary.uploader.upload(image, {
                        folder: "Ecomerce",
                        width: 150,
                        crop: "scale"
                    }))
            }
        }
        catch (error) {
            console.log(error)
            console.log(error.message)
            // console.log('error occured in cloudinary')
            res.status(404).send({ message: "nahi ho raha" })
            return
        }

        const results = await Promise.all(uploadPromises);

        // Populate checkImages array with secure URLs
        checkImages = results.map((result) => result.secure_url);

        const newProduct = { ...req.body, images: checkImages }


        // console.log("newProduct")
        // console.log(newProduct)

        const result = await collection.insertOne({ ...newProduct, images: checkImages, _id: new ObjectId() });
        // console.log(result)

        if (result) {

            res.status(200).send({ message: 'Product added successfully', id: result.insertedId });
        }
        else {
            res.status(500).send({ message: 'Failed to add object' });
        }
    }
    else
        console.log("req.body")
}

const RemoveProduct = async (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        const collection = connectAndCollect("Products")
        // console.log(req.body)

        const result = await collection.deleteOne({ _id: new ObjectId(req.body._id) });


        if (result.deletedCount === 1) {
            // console.log('Product deleted successfully');
            res.status(200).send({ message: 'Product deleted successfully' });
        }
        else {
            console.log('Document not found');
            res.status(404).send({ message: 'Product not found' });
        }
    }
    else
        console.log("req.body Epmty")
}

const updateProduct = async (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        const collection = connectAndCollect("Products")
        console.log(req.body)

        const result = await collection.updateOne({ _id: new ObjectId(req.body._id) },
            {
                $set:
                {
                    quantity: req.body.quantity
                }
            });
        if (result.modifiedCount === 1) {
            res.status(200).send({ message: 'Product updated successfully' });
        }
        else {
            res.status(404).send({ message: 'Product not found' });
        }
    }
    else
        console.log("req.body Empty")
}

const getProducts = async (req,res) => 
{
    const collection = connectAndCollect("Products")
    const products = await collection.find({}).toArray();
    if (products) {
        res.status(200).json({ message: 'User Name already Taken', statusCode: 200, products });
    }
    else {
        res.status(404).json({ message: 'Could Not get the Products', statusCode: 404 });
    }
}


export { RemoveProduct, RegisterProduct, updateProduct, getProducts }
