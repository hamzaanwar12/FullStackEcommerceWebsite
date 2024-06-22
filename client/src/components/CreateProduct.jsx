import React, { useRef, useState } from 'react'

import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import BackupIcon from '@mui/icons-material/Backup';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { useSelector } from 'react-redux';
import { addProduct } from '../store/ProductSlice.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const shippingStyle = {
  form: "w-[99%] sm2:w-[85%] mmd:w-[45%] font-simpleTwo font-bold italic mx-auto mt-[3%] flex flex-col items-center gap-y-3 rounded-xl py-5 px-2",
  formDiv: "flex items-center w-[100%] mmd:w-[98%] text-xl px-2 h-16  mx-auto border-2 border-black",
  input: "w-[90%] mx-auto cursor-pointer text-2xl  font-simpleTwo italic text-lg text-center h-full outline-0 border-none active:outline-0 focus:outline-0 active:border-none focus:border-none",
  button: "bg-red-500 text-center text-sm sm2:text-base mmd:text-xl font-semibold text-white w-[35%]  text-md p-3 border-r-2 hover:border-2  active:border-none active:bg-red-500 active:text-white hover:text-red-500 hover:border-red-500 hover:bg-white w-[98%]",
  textarea: "h-36 mmd:h-44 flex items-center w-[100%] mmd:w-[98%] text-sm sm2:text-lg mmd:text-xl px-2 h-16  mx-auto border-2 border-black",

}


export default function CreateProduct() {

  const [price, setPrice] = useState(0)
  const [productNumber, setProductNumber] = useState(0)
  // const [stock,setStock] = useState()
  const [description, setDescription] = useState("")
  const [productName, setProductName] = useState("")
  const [images, setImages] = useState([])
  const [imagePreview, setImagePreview] = useState([])

  const payBtn = useRef(null)
  const shippingInfo = useSelector(state => state.shippingInfo)
  const cart = useSelector(state => state.cart)
  const user = useSelector(state => state.signUp.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // console.log("shippingInfo in Payment")
  // console.log(shippingInfo)

  const ProductImageChange = (e) => {
    const files = Array.from(e.target.files)
    // setImages([])
    // setImagePreview([])

    files.forEach(file => 
      {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) 
        {
          setImagePreview(old => [...old, reader.result])
          setImages(old => [...old, reader.result])
          // console.log("Image reader");
          // console.log(reader.result);
          // console.log(images)
          // setAvatar(reader.result);
        }
      };

      if (e.target.files && e.target.files.length > 0) {
        reader.readAsDataURL(e.target.files[0]);
      }

    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // payBtn.current.disabled = true


    const productData =
    {
      name: productName,
      price: price,
      quantity:productNumber  ,
      images:images,
      description,
      addDate: new Date(),
      sellerId: user._id,
      reviews: []
    }

    console.log(productData)

    try {

      dispatch(addProduct(productData))
      payBtn.current.disabled = false
      navigate("/home")
      // dispatch(sendOrder(OrderData))
    }
    catch (error)
    {
      console.log("error aik wari Phir")
      console.log(error)
    }
  }

  return (
    <>
      <form className={shippingStyle.form} onSubmit={handleSubmit}>
        <div className='h-16 mmd:h-20 bg-red-500 text-white flex flex-row w-[100%] mx-auto p-2 justify-center items-center'>
          <h2 className='text-xl sm:text-2xl mmd:text-3xl font-extrabold'>Create Product</h2>
        </div>
        {/* <Elements stripe={loadStripe("pk_test_51OR8oBSAX1a9EF1bK5hMGgS3WqtozcmR5R3UBVDP7vuFqOzThuCL9jXiNz811CyzMIDTNPXdW1xFBlH768sZt2eG00d24TAiWt")}> */}



        <div className={shippingStyle.formDiv}>
          < AccountTreeIcon />
          <input placeholder="Name" type='text' value={productName} onChange={e => setProductName(e.target.value)} className={shippingStyle.input} />
        </div>


        <div className={shippingStyle.textarea}>
          {/* <DescriptionIcon /> */}
          <textarea placeholder="description" type='text' value={description} onChange={e => setDescription(e.target.value)} className={"w-[100%] my-auto h-[98%] outline-0 "} />
        </div>

        <div className={shippingStyle.formDiv}>
          <AttachMoneyIcon />
          <input placeholder="Price" type='number' value={price} onChange={e => setPrice(e.target.value)} className={shippingStyle.input} />

        </div>


        <div className={shippingStyle.formDiv}>
          <StorageIcon />
          <input className={shippingStyle.input} placeholder='stock' type='number' value={productNumber} onChange={e => setProductNumber(e.target.value)} />
        </div>

        <div id='productFile' className='w-[100%] h-auto'>
          <input
            type="file"
            name='avatar'
            accept='image/'
            onChange={ProductImageChange} 
            multiple 
            className = "w-[100%] h-24"
            />
            
        </div>


        <div id='productFilePreview' className='flex flex-row h-auto items-center justify-between overflow-auto'>
          {
            imagePreview.map((image, index) =>
              <img src={image} key={index}  className='w-20 h-20 bsm:w-32 bsm:h-32 mx-5 rounded-[50%]'/>
            )}
        </div>

        <button type='submit' ref={payBtn} onClick={handleSubmit} className={shippingStyle.button}>Create Product</button>

      </form>
    </>
  )
}
