// import Users from "../models/Users.js"
import { dbConnect } from "../database.js";
import bcrypt from "bcrypt"
import { v2 as cloudinary } from 'cloudinary';
import { ObjectId } from "mongodb"
import { connectAndCollect } from "../app.js"


// import cloudinary from "cloudinary"


const saltRounds = 10;

const RegisterUser = async (req, res) => {

    if (Object.keys(req.body).length !== 0) {
        const db = dbConnect();
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"Ecomerce",
            width:150,
            crop:"scale",
        })
        
        // console.log(req.body)

        db.collection("Users").findOne({ email: req.body.email }).then(result => {
            if (result)
                return res.status(403).send({ status: 403, message: "Email alredy exist" })

            db.collection("Users").findOne({ userName: req.body.userName }).then(result => {
                if (result)
                    return res.status(403).send({ status: 403, message: "User Name alredy exist" })


                db.collection("Users").findOne({ userName: req.body.cnic }).then(result => {
                    if (result)
                        return res.status(403).send({ status: 403, message: "CNIC alredy exist" })


                    bcrypt.genSalt(saltRounds)
                        .then((salt) => {
                            // Hash the password with the generated salt
                            return bcrypt.hash((req.body).password, salt);
                        })
                        .then(hashedPassword => 
                        {
                            cloudinary.uploader.upload(req.body.avatar, {
                                folder: "Ecomerce",
                                width: 150,
                                crop: "scale"
                            }).then(result => 
                            {
                                const newUser = {
                                    ...req.body,
                                    password: hashedPassword,
                                    userName: req.body.userName.toLowerCase(),
                                    avatar: result.secure_url
                                }
                                db.collection("Users").insertOne(newUser).then(resultUser => {
                                    res.status(200).send({ status: 200, message: "Signup successful", user: newUser })
                                });

                            }).catch(error => {
                                console.log("Error in Avatar")
                            })
                        })
                })
            })
        })
    }
    else
        console.log("req.body")
}




const LoginUser = async (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        const db = dbConnect();

        try {
            const isUser = await db.collection("Users").findOne({ userName: req.body.userName });
            // console.log("isUser")
            // console.log(isUser)

            if (isUser) {
                const passwordMatch = await bcrypt.compare(req.body.password, isUser.password);

                if (passwordMatch) {
                    return res.status(200).send({ status: 200, message: "Login Successful", user: isUser });
                }
                else {
                    return res.status(403).send({ status: 403, message: "Password does not match the username" });
                }

            }
            else {
                return res.status(403).send({ status: 403, message: "User not found" });
            }

        } catch (error) {
            console.error("Error comparing passwords:", error);
            return res.status(500).send({ status: 500, message: "Internal Server Error" });
        }
    } else {
        console.log("Empty Body");
        return res.status(400).send({ status: 400, message: "Bad Request: Empty Body" });
    }
};

const UpdatePassword = async (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        const db = dbConnect();
        // console.log(req.body);

        const filter = { _id: new ObjectId(req.body._id) };

        const user = await db.collection("Users").findOne(filter);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid previous password' });
            return;
        }

        const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);

        const updateValues = {
            $set: {
                password: hashedNewPassword
            }
        };

        const result = await db.collection("Users").updateOne(filter, updateValues, { returnDocument: 'after' });
        // console.log(result);

        if (result.modifiedCount === 1) {
            // console.log("Updated");
            res.status(200).json({ message: 'Password updated successfully', result: result, status: 200 });
        } else {
            // console.log("Nishty Daga Rooray");
            res.status(404).json({ message: 'User not found', result: result });
        }

    } else {
        // console.log("req.body in Updating User is empty");
        console.log(req.body);
    }
};



const UpdateUser = async (req, res) => {
    if (Object.keys(req.body).length !== 0) 
    {
        const db = dbConnect();

        const [previous,newOne] = [req.body.previous,req.body.newOne]

        const collection = connectAndCollect("Users")
        const filter = { userName: previous.userName };

        const image = await cloudinary.uploader.upload(newOne.avatar, {
            folder: "Ecomerce",
            width: 150,
            crop: "scale"
        })

        const updateValues = {
            $set: {
                userName:newOne.userName,
                email: newOne.email,
                avatar: image.secure_url
            }
        }

        
        const findPrevious = await db.collection("Users").findOne(filter) 
        if(findPrevious)
        {
            console.log("findPrevious")
            // console.log(findPrevious)
        }
        else{
            console.log("Not Found")
        }

        const findNewUser = await db.collection("Users").findOne({userName:newOne.userName})
        
        // console.log("findNewUser")
        // console.log(findNewUser)
        // console.log(updateValues)
        
        if (findNewUser) {
            res.status(404).json({ message: 'User Name already Taken', status: 404 });
        }
        else {

            // console.log("Entering Update")
            const result = await db.collection("Users").updateOne(filter, updateValues)

            // console.log(result)

            if (result.modifiedCount === 1) {
                // console.log("Modified")
                res.status(200).json({ message: 'User Profile Updated updated successfully', statusCode: 200, avatar:image.secure_url });
            } else {
                // console.log("Not Modified")
                res.status(404).json({ message: 'User Did not get Updated ', statusCode: 404 });
            }
        }
    }
    else {
        console.log("req.body in Updating User Profile is empty")
        // console.log(req.body)
    }
}



const GetAllUsers = async (req, res) => {
    console.log("in the Get User")
    const db = dbConnect();

    try {
        const users = await db.collection("Users").find({}).toArray();

        if (users.length > 0) {
            return res.status(200).json({ status: 200, users: users });
        } else {
            return res.status(404).json({ status: 404, message: "No users found" });
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};


const DeleteUser = async (req, res) => {
    console.log("in the delete User")
    if (!req.body.userName) {
        return res.status(400).json({ status: 400, message: "Bad Request: Missing userName in request body" });
    }

    const db = dbConnect();
    const userName = req.body.userName.toLowerCase();

    try {
        const user = await db.collection("Users").findOne({ userName: userName });

        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        const result = await db.collection("Users").deleteOne({ userName: userName });

        if (result.deletedCount === 1) {
            return res.status(200).json({ status: 200, message: "User deleted successfully" });
        } else {
            return res.status(500).json({ status: 500, message: "Failed to delete user" });
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

export { RegisterUser, LoginUser, UpdatePassword, UpdateUser,GetAllUsers, DeleteUser}