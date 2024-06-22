import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { fetchData } from "./store/Cart.js";
import { fetchUserOrders } from "./store/Order.js"
import { fetchProducts, ProductActions } from "./store/ProductSlice.js"

const Lazy = lazy(() => import("./components/Loader"))
const RegistrationForm = lazy(() => import('./components/Registration'))
const LoginForm = lazy(() => import('./components/Login'));
const Home = lazy(() => import("./pages/Home"))
const ProductSpecific = lazy(() => import("./pages/ProductSpecific"))
const Search = lazy(() => import("./pages/SearchPage"))
const Products = lazy(() => import("./components/Products"))
const Cart = lazy(() => import("./pages/CartPage"))
const Profile = lazy(() => import("./pages/Profile.jsx"))
const ShippingPage = lazy(() => import("./pages/ShippingPage.jsx"))
const PaymentPage = lazy(() => import("./pages/PaymentPage.jsx"))
const ConfirmOrderPage = lazy(() => import("./pages/ConfirmOrderPage.jsx"))
const OrdersPage = lazy(() => import("./pages/OrdersPage.jsx"))
const CreateProductPage = lazy(() => import("./pages/CreateProductPage.jsx"))
const DashboardPage = lazy(() => import("./components/Dashboard.jsx"))

import "./App.css"




const App = React.memo(() => {

  const apiUrl = process.env.REACT_APP_BACKEND_URL;
  const [strpieApiKey, setStrpieApiKey] = useState("")
  // const [strpieSecret, setStrpieSecret] = useState("")
  const user = useSelector(state => state.signUp)

  console.log("user in app")
  console.log(user)

  const dispatch = useDispatch()
  const BoughtCart = useSelector(state => state.cart)

  async function getStripeApiKey() {
    const data = await fetch(`${apiUrl}/getStripeApiKey`, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      },
    })

    const result = await data.json()
    console.log(result)
    setStrpieApiKey(result.stripeApiKey)
    // setStrpieSecret(result.secretKey)
    // console.log(data)
  }

  useEffect(() => {

    const result = async()=>
    {
      const products = await fetch(`${apiUrl}/allProducts`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        }
      })
      if(!products.ok)
      {
        console.log("Not Ok")
      }
      const productResults = await products.json()
      dispatch(ProductActions.setProducts(productResults.products))
    }

    try{
      result()

    }
    catch(error)
    {
      console.log(error)
      console.log("Could not get")
    }

    /*
        const check = async () => {
          try {
            console.log("Fetching the Stripe Key")
            await getStripeApiKey()
    
          }
          catch (error) {
            console.log("error in loadStripe")
            console.log(error)
            console.log(error.message)
          }
        }
        check()
        */
    if (user.islogin) {
      console.log("Checking")
    }
    // console.log(error.Stack
  }, [])


  return (
    <Suspense fallback={<div className='w-[15%] h-[50%] relative mx-auto mt-[12%]'> <Lazy /></div>}>
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

          {/* <Elements stripe={loadStripe(strpieApiKey)}> */}
          {/* <Route path="/payment" element={<PaymentPage secretKey={strpieSecret} stripeApiKey={strpieApiKey} />} /> */}
          <Route path="/payment" element={<PaymentPage stripeApiKey={strpieApiKey} />} />
          {/* </Elements> */}

          <Route path="/confirmOrder" element={<ConfirmOrderPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/createProduct" element={<CreateProductPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* <Route path="/SuccessMessage" element={<SuccessMessage />} /> */}
          {/* <Route path="/lazy" element={<Lazy />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </Router>
    </Suspense>
  );
})


export default App 