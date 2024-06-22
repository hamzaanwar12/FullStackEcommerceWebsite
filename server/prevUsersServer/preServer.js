// const mongoose = require("mongoose")
const express = require("express")
// const bodyParser = require("body-parser")
const mongoObj = require("./prevDatabase")
const bcrypt = require("bcrypt")

const saltRounds = 10;

/*
mongoose.connect("mongodb://localhost:27017/Ecomerce",
    {
        backend:"Ecomerce",
    }).then(()=>console.log("Conneected"))
    .catch(e=>console.log(e))

const UsersSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    userName:String,
    password:String,
    email:String,
    cnic:String,
})

const Users = mongoose.model("Users",UsersSchema)
*/

const app = express()
/*
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS,GET,POST,PATCH,DELETE"
    )
    res.setHeader("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
    }
    next();
})
*/



app.use("/registration", (req, res) => {

    if (Object.keys(req.body).length !== 0) {
        const db = mongoObj.dbConnect();

        console.log(req.body)

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
                        .then(hashedPassword => {
                            const newUser = { ...req.body, password: hashedPassword,userName:req.body.userName.toLowerCase() }
                            db.collection("Users").insertOne(newUser).then(result => {

                                res.status(200).send({ status: 200, message: "Signup successful" })
                            });
                        })
                })
            })
        })
    }
    else
        console.log("req.body")
})


/*
app.use("/registration", (req, res) => {

    if (Object.keys(req.body).length !== 0) {
        const newUser = req.body
    
        Users.create({
        })
    }
    else
        *console.log("req.body")
})

*/


app.post("/login", async (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        const db = mongoObj.dbConnect();

        try {
            const isUser = await db.collection("Users").findOne({ userName: req.body.userName });
            console.log("isUser")
            console.log(isUser)

            if (isUser) {
                const passwordMatch = await bcrypt.compare(req.body.password, isUser.password);

                if (passwordMatch) 
                {
                    return res.status(200).send({ status: 200, message: "Login Successful" }); 
                }
                else 
                {
                    return res.status(403).send({ status: 403, message: "Password does not match the username" });
                }
                
            } 
            else 
            {
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
});



app.get("/", (req, res) => res.send("Working"))
// const dotenv = require("dotenv")
// dotenv.config({path:"D:\DIFFERENT COURSES\Learning React\dbAssign\server\config\config.env"})

mongoObj.mongoConnect(() => {
    
    let port = 5000
    app.listen(port, () => {
        console.log(`Serer is working at port ${port}`)
    })
})







