// import ConnectDBwithApp from "./database.js"
import app from "./app.js"
import { mongoConnect } from "./database.js"
import {v2 as cloudinary} from 'cloudinary';
          


mongoConnect(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is working at port ${process.env.PORT}`)
    })
})

cloudinary.config({ 
    cloud_name:process.env.CLOUDARY_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
});



/*
ConnectDBwithApp(()=>{
    app.listen(process.env.PORT,()=>
    {
        console.log(`Srever is working at the Port : ${process.env.PORT}`)
    })
})
*/