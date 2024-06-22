import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    userProduct:[],
    products: [],
    viewProduct:null
}



const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addReview(state,action){

            const { id, review } = action.payload;
            // Find the index of the product with the specified ID
            const productIndex = state.products.findIndex(product => product._id === id);

            // If the product is not found, return the current state
            if (productIndex === -1) {
                return state;
            }

            // Create a shallow copy of the entire state to avoid mutating the original state
            const newState = { ...state };

            // Create a shallow copy of the product to update within the new state
            const updatedProduct = { ...newState.products[productIndex] };

            // Add the new review to the product's reviews array
            updatedProduct.reviews.push(review);

            // Update the product within the new state
            newState.products[productIndex] = updatedProduct;

            state.products = newState.products
            console.log(newState.products[productIndex])

        
            /*
            let reviewsAdder = state.products[action.payload.id-1].reviews  
            console.log(reviewsAdder)
            reviewsAdder.push(action.payload.review)
            state.products[action.payload.id].reviews = {...state.products[action.payload.id].reviews,reviewsAdder}
            console.log("added")
            */
        },
        updateProduct(state,action)
        {
            const id  = action.payload._id;
            // Find the index of the product with the specified ID
            const productIndex = state.products.findIndex(product => product._id === id);


            // Create a shallow copy of the entire state to avoid mutating the original state
            const newState = { ...state };

            // Create a shallow copy of the product to update within the new state
            let updatedProduct = { ...newState.products[productIndex] };

            // Add the new review to the product's reviews array
            updatedProduct = action.payload;

            // Update the product within the new state
            newState.products[productIndex] = updatedProduct;

            state.products = newState.products
            console.log(newState.products[productIndex])

        },
        setProducts(state,action)
        {
            state.products = action.payload            
        },
        setUserProducts(state,action)
        {
            state.userProduct = action.payload
        }
        ,addproduct(state,action)
        {
            state.products.push(action.payload)
        },
        getProduct(state,action)
        {
            const productId = action.payload
            const existence = state.products.find(element => element._id === productId )
            if (existence)
                state.viewProduct = {...existence}
            else 
                console.log("Chal side ty")
        }

    }
})


const ProductActions = ProductSlice.actions





const addProduct = (productData) => {
    return async (dispatch) => {

        const sendRequest = async () => {
            console.log({
                status: "Pending",
                message: "Placing Product"
            })

            const response = await fetch(`https://full-stack-ecommerce-website-server.vercel.app/addProduct`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            })
            if (!response.ok) {
                console.log({
                    status: "Error",
                    message: "Sending Request Not Fulfilled",
                    response
                })
            }
            const result = await response.json()
            console.log("result of Adding Product")
            console.log(result.id)
            
            dispatch(ProductActions.addproduct({...productData,_id:result.id,addDate:productData.addDate.toISOString()}))
        }

        try {
            await sendRequest()

            console.log({
                status: "Complete",
                message: "Request Fulfilled"
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}


const fetchUserProducts = (id) => {
    return async (dispatch) => {

        const fetchRequest = async () => {
            console.log("Fetching ")
            const response = await fetch(`https://full-stack-ecommerce-website-server.vercel.app/getUserProducts`, {
                method: "POST",
                body: JSON.stringify({userId:id}),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (!response.ok) {
                console.log({
                    status: "Error",
                    message: "Fetching Request Not Fulfilled"
                })
            }
            const fetched = await response.json()
            dispatch(ProductActions.setUserProducts(fetched.products))

            console.log("Fetched Orders")
            console.log(fetchedCart.orders)
        }

        try {
            console.log("Here We")
            await fetchRequest()
        }
        catch (error) {
            console.log(error.message)
        }
    }
}



const fetchProducts = () => {
    return async (dispatch) => {

        const fetchRequest = async () => {
            console.log("Fetching ")
            const response = await fetch(`https://full-stack-ecommerce-website-server.vercel.app/products`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (!response.ok) {
                console.log({
                    status: "Error",
                    message: "Fetching Request Not Fulfilled"
                })
            }
            const fetched = await response.json()
            dispatch(ProductActions.setProducts(fetched.products))

            console.log("Fetched Orders")
            console.log(fetchedCart.products)
        }

        try {
            await fetchRequest()
        }
        catch (error) {
            console.log(error.message)
        }
    }
}



const updateProduct = (values) => {
    return async (dispatch) => {

        const updateRequest = async () => {
            console.log("Fetching ")
            const response = await fetch(`https://full-stack-ecommerce-website-server.vercel.app/order/updateProduct`, {
                method: "post",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (!response.ok) {
                console.log({
                    status: "Error",
                    message: "Admin Update Request Not Fulfilled"
                })
            }
            const fetched= await response.json()

            dispatch(ProductActions.updateProduct(values))
            console.log("Fetched Orders")
            // console.log(fetchedCart.orders)
        }

        try {
            await updateRequest()
        }
        catch (error) {
            console.log(error.message)
        }
    }
}



export default ProductSlice
export { ProductActions,fetchUserProducts ,updateProduct, fetchProducts, addProduct}




