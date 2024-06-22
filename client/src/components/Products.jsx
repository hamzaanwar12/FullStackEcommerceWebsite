import Product from "./Product";
import { useSelector } from "react-redux";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./products.css";

const Products = () => {
  const [filterValue, setFilterValue] = useState([min, max]);
  const [filterProducts, setFilterProducts] = useState(null);
  const products = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.signUp);
  const navigate = useNavigate();
  const [min, max] = [0, 25000];

  const handleChange = (event, newValue) => {
    setFilterValue(newValue);

    const [minPrice, maxPrice] = newValue;
    const filterproducts = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    setFilterProducts(filterproducts);
  };

  const handleCreateProduct = () => {
    if (user.isLogin) {
      navigate("/createProduct");
    } else {
      navigate("/Login");
    }
  };

  return (
    <>
      <div className="mt-[5%] flex  flex-col  items-center justify-between w-[100%]  p-0 box-border">
        <div className="items-center justify-center flex-col w-[65%] sm2:w-[35%] mmd:w-[30%]">
            <h2 className="text-roboto text-lg font-semibold">Price</h2>
            <Slider
              value={filterValue}
              defaultValue={filterValue}
              getAriaLabel={(index) => (index === 0 ? "Min" : "Max")}
              onChange={handleChange}
              valueLabelDisplay="auto"
              min={min}
              max={max}
            />
          
          <button
            onClick={handleCreateProduct}
            className="button-fixed-size relative bg-red-500 w-[100%] text-center font-semibold text-white text-md p-3 border-2 hover:border-2 active:border-none active:bg-red-500 active:text-white hover:text-red-500 hover:border-red-500 hover:bg-white"
          >
            + Product
          </button>

        </div>

        {filterProducts && filterProducts.length === 0 && (
          <div className="w-[100%] text-center flex items-center">
            <h1 className=" text-center font-logoStyle font-extrabold text-rose-900 text-4xl w-[100%] ">
              Oops,We don't have producst in this range
            </h1>
          </div>
        )}

        <div
          id="products"
          className="mt-[2%] w-[100%] mx-auto flex flex-wrap justify-center"
        >
          {(!filterProducts &&
            Array.from(products).map((product) => {
              return <Product key={product._id} product={product} />;
            })) 
            
            ||

            filterProducts.map((product) => {
              return <Product product={product} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Products;
