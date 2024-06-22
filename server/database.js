import mongodb  from "mongodb"
const MongoClient = mongodb.MongoClient;

let db;

const mongoConnect = (cb)=>
{
    // "mongodb+srv://Recky776:Hamza8063@cluster0.ay7ptf3.mongodb.net/?retryWrites=true&w=majority",
    MongoClient.connect(
        process.env.DATABASE_KEY,
        {
            ssl:true,
            serverSelectionTimeoutMS:5000,
        }).then(client=>{
            db = client.db("Ecomerce")
            cb()
            console.log("Database Connected")
        })
        .catch(err=>
        {
            console.log(err)
        })
};

const dbConnect = ()=>
{
    if(db)
        return db;
    throw "Database Not Found";
}

export{mongoConnect,dbConnect}