import { Country, State, City } from 'country-state-city';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import PinDropIcon from '@mui/icons-material/PinDrop';
import CheckOut from './CheckOut'
import { shippingInfoActions } from '../store/Shipping';
import { useNavigate } from 'react-router-dom';

const shippingStyle = {
    // form: "w-[40%] font-simpleTwo font-bold italic mx-auto mt-[3%] flex flex-col items-center gap-y-3 rounded-xl shadow-black shadow-lg py-5 px-2",
    form:  "w-[94%] ssm:w-[85%] sm2:w-[60%] md:w-[38%] font-simpleTwo font-normal sm2:font-bold italic mx-auto mt-[3%] flex flex-col items-center gap-y-3 rounded-xl py-5 msm:px-2",
    // formDiv: "flex items-center w-[98%] text-xl px-2 h-16  mx-auto border-2 border-black",
    formDiv: "flex items-center w-[100%]  lg:w-[98%]  lg:px-1 h-12 sm2:h-16  mx-auto border-2 border-black",
    select: "w-[100%] h-full outline-0 text-center text-md mmd:text-lg",
    option: "font-roboto font-light h-full outline-0 border-none focus:outline-0 focus:border-none active:outline-0 active:border-none w-full",
    // input: "w-[95%] font-simpleTwo italic text-lg text-center h-full outline-0 border-none active:outline-0 focus:outline-0 active:border-none focus:border-none",
    input: "w-[100%] cursor-pointer font-simpleTwo italic text-sm msm:text-lg text-center h-full outline-0 border-none active:outline-0 focus:outline-0 active:border-none focus:border-none",
    button: "h-12 text-white text-lg msm:text-xl mmd:text-2xl hover:bg-white hover:text-black hover:border-black hover:border-2  active:bg-black active:text-white bg-black  w-[98%]",
    icon: "text-xl"
}

const Shipping = () => {

    
    
    const cart = useSelector(state => state.cart)
    const user = useSelector((state) => state.signUp);
    const shippingInfo = useSelector(state=>state.shippingInfo)
    
    const [phone, setPhone] = useState(shippingInfo.phone)
    const [country, setCountry] = useState(shippingInfo.country)
    const [state, setState] = useState(shippingInfo.state)
    const [city, setCity] = useState(shippingInfo.city)
    const [address, setAddress] = useState(shippingInfo.address)
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleSubmit = (event) => {
        event.preventDefault()
        if (state) {
            console.log("Able")
            if(phone.length!==10)
            {
                alert("Phone NUmber can only be of 10 digits")
            }
            else
            {
                dispatch(shippingInfoActions.setInfo({
                    phone, 
                    country,
                    state,
                    city,
                    address,
                    pinCode
                }))
                navigate("/confirmOrder")
            }
        }
        else
            console.log("button disable after the click")
    }

    // console.log(Country.getAllCountries())
    // console.log(State.getAllStates())

    useEffect(() => {
      if (!user.isLogin) navigate("/Login");
    }, []);


    return (

        <>
            <CheckOut activeStep={0} />

            <form className={shippingStyle.form} onSubmit={handleSubmit}>
            <div className='h-10 sm2:h-15 flex flex-row w-[100%] mx-auto sm2:p-2 justify-center items-center'>
                    <h2 className='text-lg sm2:text-xl mmd:text-3xl font-extrabold'>Shipping Details</h2>
                </div>
                
                {/* <div className='h-20 flex flex-row w-[100%] mx-auto p-2 justify-center items-center'>
                    <h2 className='text-3xl font-extrabold'>Shipping Details</h2>
                </div> */}

                <div className={shippingStyle.formDiv}>
                    <HomeIcon />
                    <input
                        className={shippingStyle.input}
                        type="text"
                        required
                        name='address'
                        placeholder='Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)} />
                </div>

                <div className={shippingStyle.formDiv}>
                    <LocationCityIcon />
                    <input
                        className={shippingStyle.input}
                        type="text"
                        required
                        name='city'
                        placeholder='City'
                        value={city}
                        onChange={(e) => setCity(e.target.value)} />
                </div>

                <div className={shippingStyle.formDiv}>
                    <PinDropIcon />
                    <input
                        className={shippingStyle.input}
                        type="number"
                        required
                        name='pin'
                        size="10"
                        maxLength="11"
                        placeholder='Pin Code'
                        autoComplete="off"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                    />
                </div>


                <div className={shippingStyle.formDiv}>
                    <PhoneIcon />
                    <input
                        className={shippingStyle.input}
                        type="number"
                        required
                        name='phone'
                        placeholder='Phone Number'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        size="10"
                    />
                </div>

                <div className={shippingStyle.formDiv}>
                    <PublicIcon />
                    <select
                        required
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        className={shippingStyle.select}
                    >
                        <option value="" className={shippingStyle.option}>Country</option>
                        {

                            Country && Country.getAllCountries().map(item =>
                                <option key={item.isoCode} value={item.isoCode} className={shippingStyle.option}>
                                    {item.name}
                                </option>
                            )}
                    </select>
                </div>

                {
                    country &&
                    <div className={shippingStyle.formDiv}>
                        <TransferWithinAStationIcon />
                        <select
                            required
                            value={state}
                            onChange={e => setState(e.target.value)}
                            className={shippingStyle.select}
                        >
                            <option value="" className={shippingStyle.option}>State</option>
                            {
                                State && State.getStatesOfCountry(country).map(item =>
                                    <option className={shippingStyle.option} key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                )}
                        </select>
                    </div>
                }
                <button
                    className={shippingStyle.button}
                    disabled={state ? false : true}>
                    Continue
                </button>

            </form>
        </>

    )
}

export default Shipping