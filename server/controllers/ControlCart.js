import { connectAndCollect } from "../app.js"
import { ObjectId } from "mongodb"


const updateCart = async (req, res) => 
{
    // console.log("Request At Updating Cart")
    // console.log(req.body)
    if (Object.keys(req.body).length !== 0) {

        
        // Assuming '_id' is the field you want to match
        //const filter = { userId: req.body.userId };
        const filter = { userId: req.body.userId };

        // Set the new values you want to update
        const updateValues = {
            $set: {
                totalItems: req.body.totalItems,
                totalPrice: req.body.totalPrice,
                items: req.body.items
            }
        };

        // Use the updateOne method to update the document
        const collection = connectAndCollect("Carts")
        const result = await collection.updateOne(filter, updateValues);

        if (result.modifiedCount === 1){
            res.status(200).json({ message: 'Cart updated successfully',result:result });
        } else {
            res.status(404).json({ message: 'Cart not found', result:result});
        }


    }
    else {
        console.log("req.body in Updating Cart is empty")
        // console.log(req.body)
    }
}

const addCart = async (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        const collection = connectAndCollect("Carts")
        // console.log(req.body)

        const result = await collection.insertOne(req.body)

        if (result) {
            res.status(200).send({ message: 'Cart added successfully', id: result.insertedId });
        }
        else {
            res.status(404).send({ message: 'Cart not found' });
        }
    }
    else
        console.log("req.body Empty")
}

const getCart = async (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        const collection = connectAndCollect("Carts")
        // console.log(req.body)

        const result = await collection.findOne({userName: req.body.userName })
        if (result) {
            res.status(200).send({ message: 'Cart Found and returned successfully' });
        }
        else {
            res.status(404).send({ message: 'Cart not found' });
        }
    }
    else
        console.log("req.body Empty")
}

const getCartByUser = async (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        const collection = connectAndCollect("Carts")
        // console.log(req.body)

        const result = await collection.findOne({ userId: req.body.userId })
        if (result) {
            res.status(200).send({ message: 'Cart Found and returned successfully', cart: result });
        }
        else {
            res.status(404).send({ message: 'Cart not found' });
        }
    }
    else {
        console.log("req.body Empty in cart getCartByUser" )
        // console.log(req.body)
    }
}



const getAllCarts = async (req, res) => {
    try {
        const collection = connectAndCollect("Carts");
        const result = await collection.find({}).toArray();
        
        if (result.length > 0) {
            res.status(200).send({ message: 'Carts found and returned successfully', carts: result });
        } else {
            res.status(404).send({ message: 'No carts found' });
        }
    } catch (error) {
        // console.error("Error fetching carts: ", error);
        res.status(500).send({ message: 'Internal server error' });
    }
};


const deleteCart = async (req, res) => {
    if (req.body._id)
        {
        try {
            const collection = connectAndCollect("Carts");
            const result = await collection.deleteOne({ _id:new ObjectId(req.body._id)});
            if (result.deletedCount === 1) {
                res.status(200).send({ message: 'Cart deleted successfully' });
            } else {
                res.status(404).send({ message: 'Cart not found' });
            }
        } catch (error) {
            // console.error("Error deleting cart: ", error);
            res.status(500).send({ message: 'Internal server error' });
        }
    } else {
        res.status(400).send({ message: 'Invalid cart ID' });
    }
};


export { updateCart, addCart, getCart, getCartByUser, getAllCarts,deleteCart}


