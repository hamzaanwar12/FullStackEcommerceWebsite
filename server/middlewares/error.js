import ErrorHandler from "../utils/errorHandler.js";

const errorMiddleware =  function(err,req,res,next){
    err.statusCode = err.statusCode||500
    err.message = err.message || "Internal Server Error Yourself"

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        stack:err.stack
    })
}


export default errorMiddleware