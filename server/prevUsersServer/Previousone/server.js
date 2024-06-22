const express = require("express")
const mongoObj = require("./database")
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

app.use("/", (req, res) => {

    // const parsedData = JSON.parse(req.body);

    if (Object.keys(req.body).length !== 0) 
    {
        const db = mongoObj.dbConnect();
        console.log("hello")
        console.log(req.body)
        db.collection("users").findOne({email: req.body.email}).then(result=>{
            if(result){
                return res.status(403).send({message: "Email alredy exist"})
            }
            db.collection("users").insertOne(req.body).then(result=>{
                res.status(200).send({message:"Signup successful"})
            });
            
        })
    }
    else
        console.log("req.body")

})


mongoObj.mongoConnect(() => {
    let port = 5000
    app.listen(port, () => console.log(`Server started on the port ${port}`))
})



