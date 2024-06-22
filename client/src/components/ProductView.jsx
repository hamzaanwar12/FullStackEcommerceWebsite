import { useState } from "react";
import ReviewCard from "./ReviewCard";
// import { pageStyles } from "./styl.js";
import SubmitReview from "./SubmitReview.jsx";
import AddToCart from "./AddTocart.jsx";
import { addToCartAndSendData } from "../store/Cart.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import Slider from "react-slick";
import ReactStars from "react-rating-stars-component";
import "react-multi-carousel/lib/styles.css";
import "reactjs-popup/dist/index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductView.css";

const ProductView = ({ productid }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const product = useSelector((state) => state.products.viewProduct);
  const login = useSelector((state) => state.signUp);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "gold",
    value: product.rating || 0,
    size: 35,
    isHalf: true,
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  const addHandler = () => {
    let countNum = parseInt(count);
    if (countNum < product.quantity) setCount(parseInt(count) + 1);
  };

  const subtractHandler = () => {
    let countNum = parseInt(count);
    if (countNum > 1) setCount(parseInt(count) - 1);
  };

  const changeHandler = (event) => {
    if (event.target.value > 0) setCount(event.target.value);
  };

  const AddCartHandler = (close) => {
    if (login.isLogin) {
      dispatch(addToCartAndSendData({ ...product, quantity: count }));

      if (close) {
        close();
      }
    } else {
      navigate("/Login");
    }
  };

  /*
  const AddCartHandler = (close) => {
    if (login.isLogin) {
      console.log("Check inAdd Handler")
      console.log({ ...product, quantity: count })
      dispatch(cartActions.addToCart({ ...product, quantity: count }));
      
      if (close) {
        close();
      }
    } else {
      navigate("/Login");
    }
  };
*/

  return (
    <>
      <div className="productView">
        <div className="font-roboto min-h-full mt-8 h-auto font-light flex flex-col mmd:flex-row w-[95%] mx-auto">
          <div className="w-full mmd:w-1/2 p-5 flex items-center justify-center border-2 border-white">
            <Slider className="my-slider" {...settings}>
              {product.images.map((item, i) => (
                <div key={item} className="w-full">
                  <img
                    className="h-[70%] w-[85%] cursor-pointer object-cover mx-auto"
                    src={item}
                    alt={`${item} slide`}
                    title={item}
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div className="w-full mmd:w-1/2 h-auto box-border flex items-center p-1 mmd:p-2 mmd:pl-7 border-2 border-white">
            <div className="h-[85%] w-full flex items-center p-2 flex-col gap-y-3">
              <div className="flex flex-col w-full border-b-2 border-gray-500">
                <h1 className="font-logoStyle tracking-widest font-black text-xl mmd:text-4xl">
                  {product.name}
                </h1>
                <p className="font-logoStyle font-bold mmd:font-extrabold text-xs sm2:text-md mmd:text-lg">
                  Product : <span>{product._id}</span>
                </p>
              </div>

              <div className="font-logoStyle font-bold flex flex-col text-lg mmd:text-xl box-border w-full border-b-2 border-gray-500">
                <h3>Give a review</h3>
                <ReactStars options={options} />
              </div>

              <div className="flex flex-row justify-between items-center w-full border-b-2 border-gray-500">
                <h2 className="font-logoStyle text-lg mmd:text-3xl text-bold">
                  PKR{" "}
                  {new Intl.NumberFormat({ style: "currency" }).format(
                    product.price
                  )}{" "}
                  <span>only</span>
                </h2>
              </div>

              <div className="py-1 flex flex-col gap-y-2 sm2:gap-y-0 ssm:flex-row justify-between items-center w-full border-b-2 border-gray-500">
                <div className="flex items-center">
                  <button
                    className="w-7 h-7 mmd:w-10 mmd:h-8 text-2xl bg-black text-white"
                    onClick={subtractHandler}
                  >
                    -
                  </button>
                  <input
                    className="w-8 h-7 mmd:w-14 mmd:h-8 font-logoStyle bg-white text-center outline-none"
                    type="number"
                    value={count}
                    onChange={changeHandler}
                  />
                  <button
                    className="w-7 h-7 mmd:w-10 mmd:h-8 text-2xl bg-black text-white"
                    onClick={addHandler}
                  >
                    +
                  </button>
                </div>
                {login.isLogin ? (
                  <Popup
                    trigger={
                      <button className="font-logoStyle font-extrabold bg-red-500 sm2:mr-10 text-center w-25 sm2:w-32 text-white rounded-lg text-sm sm2:text-md p-2 sm2:p-3  border-none border-white hover:border-re active:border-none active:bg-red-500 active:text-white hover:text-red-500 hover:border-red-500 hover:bg-white">
                        Add to cart
                      </button>
                    }
                    modal
                    nested
                  >
                    {(close) => (
                      <AddToCart close={close} addToCart={AddCartHandler} />
                    )}
                  </Popup>
                ) : (
                  // <Popup
                  //   trigger={
                  //     <button
                  //       className="font-logoStyle font-extrabold bg-red-500 sm2:mr-10 text-center w-25 sm2:w-32 text-white rounded-lg text-sm sm2:text-md p-2 sm2:p-3 border-none border-white hover:border-re active:border-none active:bg-red-500 active:text-white hover:text-red-500 hover:border-red-500 hover:bg-white"
                  //       onClick={() => AddCartHandler(null)}
                  //     >
                  //       Add to cart
                  //     </button>
                  //   }
                  //   modal
                  //   nested
                  // >
                  //   {(close) => <AddToCart close={close} />}
                  // </Popup>
                  <button
                    className="font-logoStyle font-extrabold bg-red-500 sm2:mr-10 text-center w-25 sm2:w-32 text-white rounded-lg text-sm sm2:text-md p-2 sm2:p-3 border-none border-white hover:border-re active:border-none active:bg-red-500 active:text-white hover:text-red-500 hover:border-red-500 hover:bg-white"
                    onClick={AddCartHandler}
                  >
                    Add to cart
                  </button>
                )}
              </div>

              <div className="font-logoStyle flex items-center w-full border-b-2 border-gray-500">
                <h2 className="font-semibold text-xl">
                  Product:{" "}
                  <span
                    className={`font-bold text-2xl ${
                      product.quantity > 0 ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[3%] flex flex-col items-center w-11/12 mx-auto">
        <div className="flex flex-col">
          <h2 className="font-semibold text-xl">Description:</h2>
          <p className="mt-3">{product.description}</p>
        </div>

        <Popup
          trigger={
            <button className="mt-[2%] bg-red-500 text-center h-16 w-1/2 lg:w-1/4 text-white rounded-lg text-md border-r-2 border-2 hover:font-semibold hover:border-2 active:border-none active:bg-red-500 active:text-white hover:text-red-500 hover:border-red-500 hover:bg-white">
              Submit Review
            </button>
          }
          modal
          nested
        >
          {(close) => <SubmitReview close={close} product={product} />}
        </Popup>
      </div>

      <div className="shadow-black shadow-lg h-20 flex flex-row w-1/2 lg:w-1/4 mt-[5%] mx-auto p-2 justify-center items-center">
        <h1 className="text-center font-logoStyle font-extrabold text-lg sm2:text-2xl mmd:text-4xl w-full">
          Reviews
        </h1>
      </div>
      <div className="mx-auto mt-[5%] pt-10 w-10/12 mmd:w-1/2 min-h-45 flex items-center justify-between">
        {product.reviews && product.reviews[0] ? (
          <Slider className="cursor-pointer my-slider" {...settings}>
            {product.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </Slider>
        ) : (
          <p>No Reviews Given Yet</p>
        )}
      </div>
    </>
  );
};

export default ProductView;
