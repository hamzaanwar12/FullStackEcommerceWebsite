import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const AddToCart = ({ close, addToCart }) => {
  const login = useSelector((state) => state.signUp);
  const navigate = useNavigate();

  const handleVisit = (event) => {
    event.preventDefault();
    if (login.isLogin) 
      {
      addToCart();
      navigate("/Cart");
    } else navigate("/Login");
    close();
  };
  const handleClose = (event) => {
    event.preventDefault();
    addToCart();
    close();
  };

  return (
    <div className="sm2:h-smButtons mmd:h-buttons py-2 font-roboto flex flex-col justify-center items-center">
      <div className=" flex flex-col gap-y-5 mmd:gap-y-9">
        <div className="flex items-center  text-base">
          <h1 className="font-roboto  text-center font-extrabold text-base sm2:text-xl mmd:text-2xl">
            The Product has been added to Cart
          </h1>
        </div>
        <div className="w-[100%]  mx-auto  flex flex-col  msm:flex-row justify-between items-center">
          <button
            onClick={handleVisit}
            className="bg-red-500 text-center w-2/4  my-1 mx-0 msm:mx-1 msm:my-0  mmd:w-1/3 mmd:mr-0 mmd:ml-0 text-white rounded-lg sm2:text-base mmd:text-md sm2:p-2 mmd:p-3 border-2 border-red-500   active:border-none active:bg-red-500 active:text-white hover:border-2 hover:text-red-500 hover:border-red-600 hover:bg-white "
          >
            Visit Cart
          </button>
          <button
            onClick={handleClose}
            className="bg-red-500 text-center w-2/4 mr-1 ml-1  mmd:w-1/3 mmd:mr-0 mmd:ml-0 text-white rounded-lg sm2:text-base mmd:text-md sm2:p-2 mmd:p-3 border-2 border-red-500 hover:border-2 active:border-none active:bg-red-500 active:text-white hover:text-red-500 hover:border-red-500 hover:bg-white "
          >
            Close{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
