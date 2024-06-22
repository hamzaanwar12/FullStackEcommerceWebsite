import { useParams } from "react-router-dom"
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserOptions from "../components/UserOptions";
import React, { lazy, Suspense, useState } from 'react';
const ProductView = lazy(() => import("../components/ProductView"));
const Lazy = lazy(() => import("../components/Loader"))


const ProductSpecific = () => {
    const productid = useParams()

    return (
        <Suspense fallback={<div className='w-[15%] h-[50%] relative mx-auto mt-[12%]'> <Lazy /></div>}>
            <Header />
            <UserOptions />
            <ProductView productid={productid}/>
            <Footer/>
        </Suspense>
    )
}

export default ProductSpecific