import { connectAndCollect } from "../app.js"
import { ObjectId } from "mongodb"


const updateOrderStatus = async (req, res) => 
{
    
    console.log("Request At Updating Order Status")
    // console.log(req.body)
    
    if (Object.keys(req.body).length !== 0) 
    {
        const collection = connectAndCollect("Orders")
        const filter = { _id: new ObjectId(req.body.id)};
        // Set the new values you want to update
        const updateValues = {
            $set: {
                status: req.body.status
            }
        };

        const result = await collection.updateOne(filter, updateValues);

        if (result.modifiedCount === 1) {
            res.status(200).json({ message: 'Order updated successfully', statusCode: 200 });
        }
        else 
        {
            res.status(404).json({ message: 'Orders not found', statusCode: 400 });
        }
    }
    else {
        console.log("req.body in Updating Order is empty")
        // console.log(req.body)
    }
}

const placeOrder = async (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        
        const collection = connectAndCollect("Orders")
        // console.log(req.body)
        // console.log("Sending to Orders")

        const result = await  collection.insertOne({...req.body,_id: new ObjectId() })
        if (result) {
            res.status(200).send({ message: 'Order placed successfully',statusCode:200, id: result.insertedId });
        }
        else {
            res.status(404).send({ message: 'Order could not placed' });
        }
    }
    else
        console.log("req.body Empty")
}

const getUserOrders = async (req, res) => 
{
    if (Object.keys(req.body).length !== 0) {
        // Assuming 'userId' is the field you want to match
        const collection = connectAndCollect("Orders")
        // console.log(collection)
        // console.log("Getting Request")
        const filter = { userId: req.body.userId};
        
        const userOrders = await collection.find(filter).toArray();

        if (userOrders) {
            res.status(200).json({ message: 'Orders Returned for Particular Users', statusCode: 200, orders:userOrders });
        }
        else {
            res.status(404).json({ message: 'Could Not get the Orders', statusCode: 404 });
        }

    }
}

const getAllOrders = async (req,res) => 
{
    const collection = connectAndCollect("Orders")
    const orders = await collection.find({}).toArray();
    if (orders) {
        res.status(200).json({ message: 'User Name already Taken', statusCode: 200, orders });
    }
    else {
        res.status(404).json({ message: 'Could Not get the Orders', statusCode: 404 });
    }
}


export { placeOrder, getAllOrders, getUserOrders, updateOrderStatus }


