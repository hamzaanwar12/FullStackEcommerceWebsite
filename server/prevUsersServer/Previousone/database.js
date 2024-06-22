const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient;

let db;

exports.mongoConnect = (cb)=>
{
    MongoClient.connect(
        "mongodb+srv://Recky776:Hamza8063@cluster0.ay7ptf3.mongodb.net/?retryWrites=true&w=majority",
        {
            ssl:true,
            serverSelectionTimeoutMS:5000,
        }).then(client=>{
            db = client.db("Registration")
            cb()
        })
        .catch(err=>
        {
            console.log(err)
        })
};

exports.dbConnect = ()=>
{
    if(db)
        return db;
    throw "Database Not Found";
}


