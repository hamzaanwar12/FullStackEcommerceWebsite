import ReactStars from "react-rating-stars-component"
import profile from "../assets/profile.png"

const ReviewCard = ({ review }) => {

    
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "gold",
        value: 3,
        size: 35,
        isHalf: true
    }

    return (
        <div className="cursor-pointer flex text-center font-roboto flex-col mx-5 my-5 items-center w-[90%] object-cover shadow-black shadow-md min-h-cardView h-auto gap-y-3 ">
            <div className="mt-3 flex flex-col gap-y-2">
                <img className=" min-w-12 h-12" src={profile} alt="" />
                <h1 className="font-stylish">{review.name}</h1>
            </div>
            <ReactStars {
                ...{
                    edit: false,
                    color: "rgba(20,20,20,0.1)",
                    activeColor: "gold",
                    value: review.rating,
                    size: 35,
                    isHalf: true
                }
            } />
            <p className="p-2">{review.mesage}</p>
        </div>
    )
}

export default ReviewCard