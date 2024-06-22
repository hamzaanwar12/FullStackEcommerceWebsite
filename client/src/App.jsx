import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./store/Cart.js";
import { fetchUserOrders } from "./store/Order.js";
import { fetchProducts, ProductActions } from "./store/ProductSlice.js";

const Lazy = lazy(() => import("./components/Loader"));
const RegistrationForm = lazy(() => import("./components/Registration"));
const LoginForm = lazy(() => import("./components/Login"));
const Home = lazy(() => import("./pages/Home"));
const ProductSpecific = lazy(() => import("./pages/ProductSpecific"));
const Search = lazy(() => import("./pages/SearchPage"));
const Products = lazy(() => import("./components/Products"));
const Cart = lazy(() => import("./pages/CartPage"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const ShippingPage = lazy(() => import("./pages/ShippingPage.jsx"));
const PaymentPage = lazy(() => import("./pages/PaymentPage.jsx"));
const ConfirmOrderPage = lazy(() => import("./pages/ConfirmOrderPage.jsx"));
const OrdersPage = lazy(() => import("./pages/OrdersPage.jsx"));
const CreateProductPage = lazy(() => import("./pages/CreateProductPage.jsx"));
const DashboardPage = lazy(() => import("./components/Dashboard.jsx"));

import "./App.css";

const App = React.memo(() => {

  const [stripeApiKey, setStripeApiKey] = useState("");
  const user = useSelector((state) => state.signUp);
  
  // console.log("import.meta.env", import.meta.env);
  // console.log("VITE_BASE_URL", JSON.stringify(import.meta.env.VITE_BASE_URL));
  // console.log("VITE_BACKEND_URL", JSON.stringify(import.meta.env.VITE_BACKEND_URL));

  // const apiUrl = JSON.stringify(import.meta.env.VITE_BACKEND_URL);
  // console.log("apiUrl", apiUrl); // Debugging line
  // console.log("user in app");
  // console.log(user);



  const dispatch = useDispatch();
  const BoughtCart = useSelector((state) => state.cart);

  async function getStripeApiKey() {
    try {
      const response = await fetch(`https://full-stack-ecommerce-website-server.vercel.app/getStripeApiKey`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result);
      setStripeApiKey(result.stripeApiKey);
    } catch (error) {
      console.log(error.message)
      console.error("Failed to fetch the Stripe API key:", error);
    }
  }

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await fetch(`https://full-stack-ecommerce-website-server.vercel.app/allProducts`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const productResults = await response.json();
        dispatch(ProductActions.setProducts(productResults.products));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProductsData();

    if (user.islogin) {
      console.log("User is logged in, fetching Stripe API key...");
      getStripeApiKey();
    }
  }, []);

  return (
    <Suspense
      fallback={
        <div className="w-[15%] h-[50%] relative mx-auto mt-[12%]">
          <Lazy />
        </div>
      }
    >
      <Router>
        <Routes>
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/product/:productid" element={<ProductSpecific />} />
          <Route path="/Search" element={<Search />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/Home#products" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Account" element={<Profile />} />
          <Route path="/Shipping" element={<ShippingPage />} />
          <Route
            path="/payment"
            element={<PaymentPage stripeApiKey={stripeApiKey} />}
          />
          <Route path="/confirmOrder" element={<ConfirmOrderPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/createProduct" element={<CreateProductPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </Suspense>
  );
});

export default App;
