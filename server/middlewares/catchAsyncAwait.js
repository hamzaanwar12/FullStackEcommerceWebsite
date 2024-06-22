const catchAsyncAwait = theFunc=>(req,res,next)=>{
    Promise.resolve(theFunc(req,res,next)).catch(next())
}
export default catchAsyncAwait

