import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { ProductActions } from "../store/ProductSlice.js"
import ReactStars from "react-rating-stars-component"
import { useNavigate } from "react-router-dom";
import "./submitreview.css"
  

const SubmitReview = ({ product, close }) => {


    const user = useSelector(state => state.signUp.user)
    const [rating, setRating] = useState(0)
    const navigate = useNavigate();

    
    // console.log("user Adde zReview")
    // console.log(user)


    const handleRating = (newRating) => {
        console.log(newRating)
        setRating(newRating)
    }

    const [comment, setComment] = useState("")
    const [error, setError] = useState(false)
    const dispatch = useDispatch()

    const options = {
        edit: true,
        color: "rgba(20,20,20,0.1)",
        activeColor: "gold",
        value: rating,
        size: 35,
        isHalf: true,
        onChange: handleRating
    }

    const handleChange = (event) => setComment(event.target.value)
    const handleSubmit = (event) => {

        event.preventDefault()
        if (user.isLogin)
        {
            if (comment.trim().length === 0 || comment.trim() === "") {
                setError('Review should not be Empty')
            }
            else {
                console.log("Entered Values are correct")
                // console.log(values)
                console.log({
                    id: product._id,
                    review: {
                        mesage: comment,
                        name: user.user.userName,
                        _id: product.reviews.length + 1,
                        rating
                    }
                })
                dispatch(ProductActions.addReview({
                    id: product._id,
                    review: {
                        mesage: comment,
                        name: user.user.userName,
                        _id: product.reviews.length + 1,
                        rating
                    }
                }))
                alert("Review Added Refresh your Page to see it")
                close()
            }
        }
        else{

            alert("Login First")
            navigate("/Login")
        }
    }



    return (
        <div className="flex flex-col gap-y-5 items-center justify-center box-border">
            <div className=" flex items-center">
                <h1 className=" font-roboto text-lg">What do you think of this product</h1>
            </div>
            <form className="flex flex-col gap-y-2 justify-center w-[70%] mx-auto" onSubmit={handleSubmit}>
                <textarea name="comment" className="text-black h-32 outline-none border-2 border-violet-600 p-2" type="text" onChange={handleChange} placeholder="Comment here" value={comment} />
                {error && <p>*{error}</p>}

                <div className="flex flex-row items-center"> 
                    <h1 className="font-roboto text-lg">Rate it</h1>
                    <ReactStars {...{ ...options, value: 0 }}></ReactStars>
                </div>

                <div className="w-[100%] mx-auto flex items-center justify-between">
                    <button type="submit" className="bg-red-500 text-center w-44 text-white rounded-lg text-md p-3 border-r-2   active:border-none active:bg-red-500 active:text-white hover:border-2 hover:text-red-500 hover:border-red-600 hover:bg-white ">Submit </button>
                    <button onClick={() => close()} className="bg-red-500 text-center w-44 text-white rounded-lg text-md p-3 border-r-2 hover:border-2 active:border-none active:bg-red-500 active:text-white hover:text-red-500 hover:border-red-500 hover:bg-white ">Close </button>
                </div>
            </form>
        </div>
    )
}

export default SubmitReview