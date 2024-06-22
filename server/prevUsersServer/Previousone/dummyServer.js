const express = require("express")
const mongoObject = require("./database")
const bodyParser = require("body-parser")
const app = express()

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

app.use("/",(req, res, next)=>{
    const db = mongoObj.dbConnect();
    console.log("hello")
    db.collection("users").findOne({email: req.body.email}).then(result=>{
        if(result){
            return res.status(403).send({message: "Email alredy exist"})
        }
        db.collection("users").insertOne(req.body);
        res.status(200).send({message:"Signup successful"})
    })
})

app.use("/", (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        console.log("req.body not empty")
        console.log(req.body)

        const db = mongoObject.dbConnect()


        db.collection("users").findOne({ email: req.body.email }).then(result => {
            if (result) 
                return res.status(403).send({ message: "Email alredy exist" })
            
                /*
            db.collection("users").findOne({ email: req.body.cnic }).then(cincResult => {
                if (cincResult)
                    return res.status(403).send({ message: "CNIC alredy exist" })
                db.collection("users").findOne({ email: req.body.userName }).then(userNameRes=> {
                    if (userNameRes)
                        return res.status(403).send({ message: "UserName alredy exist" })
                })
            })
            */
            db.collection("users").insertOne(req.body);
            res.status(200).send({ message: "Signup successful" })
        })

    }
    else
        console.log("req.body is empty")
})



mongoObject.mongoConnect(() => {
    let port = 5000
    app.listen(port, () => console.log(`Server started on the port ${port}`))
})



