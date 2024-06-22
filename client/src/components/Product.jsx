import { Link, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { ProductActions } from "../store/ProductSlice";
import { useDispatch } from "react-redux";
import "./product.css"
const options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  activeColor: "gold",
  value: 2.5,
  size: window.innerWidth > 600 ? 20 : 25,
  isHalf: true,
};

const Product = (product) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(ProductActions.getProduct(product.product._id));
    navigate(`/product/${product.product._id}`);
  };
  return (
    
      <button
        onClick={handleChange}
        to={`/product/${product.product._id}`}
        className="shadow-custom-black  mx-2 hover:scale-105 w-s2RecentCard sm2:w-sRecentCard bsm:w-recentCard h-recentCard  my-[3%]  items-center flex flex-col overflow-hidden shadow-black cursor-pointer shadow-lg rounded-xl"
      >
        <img
          className="w-[100%] object-contain h-cardImg"
          src={product.product.images[0]}
          alt={product.product.name}
        />

        <div className="mt-2 w-[100%] flex flex-col items-center border-t-2 border-gray-300 text-black font-roboto text-center">
          <p>{product.product.name}</p>
          <div>
            <ReactStars {...options}></ReactStars>
          </div>

          <p>PKR {new Intl.NumberFormat().format(product.product.price)}</p>
          <p>Reviews {product.product.reviews.length}</p>
        </div>
      </button>
  );
};

export default Product;
