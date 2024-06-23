import { ReactNavbar } from "overlay-navbar"
import logo from "../assets/logo.png" 
import "./Header.css"
// import { useEffect } from "react"
import { FaCartShopping } from "react-icons/fa6"
import { IoMdSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";


const Header = () => {
    
    return (
        <div className="w-[100%]  m-0 box-border h-[100%]  font-light text-roboto" >
            <ReactNavbar
                burgerColor="red"
                burgerColorHover  = "grey"
                logo = {logo}
                logoWidth = "19rem"
                logoHeight = "9rem"
                logoHoverColor = "#6239b5"
                navColor1 = "white"
                link1Size = "1.5rem"
                link1Margin ="1vmax"
                link1Family = "Roboto"
                // link1Color = "rgba(0,0,0,0.6)"
                link1Color = "black"
                // link1ColorHover  = "rgba(220, 20, 60, 0.733)"
                link1ColorHover  = "#6239b5"
                
                link1Text = "Home"
                link2Text = "Products"
                link3Text = "Contact"
                link4Text = "About"
                
                // link1Margin = "3rem"
                link1Url = "/Home"
                link2Url = "/Home#products"
                // link3Url = "/Home"
                link4Url = "/Account"
                

                profileIcon = {true}
                ProfileIconElement = {FaUser}
                profileIconColor = 'black'
                profileIconSize = "1.5rem"
                profileIconMargin = "1rem"
                // profileIconColorHover = "rgba(220, 20, 60, 0.733)"
                profileIconColorHover = "#6239b5"
                
                cartIcon = {true}
                CartIconElement = {FaCartShopping}
                cartIconColor = "black"
                cartIconSize = "1.5rem"
                cartIconMargin = "1rem"
                // cartIconColorHover = "rgba(220, 20, 60, 0.733)"
                cartIconColorHover = "#6239b5"
                
                searchIcon = {false}
                SearchIconElement = {IoMdSearch}
                searchIconColor = "black"
                searchIconSize = "2rem"
                searchIconMargin = "1rem"
                // searchIconColorHover = "rgba(220, 20, 60, 0.733)"
                searchIconColorHover = "#6239b5"
                nav1Transition = {0.2}
            />
            
        </div>

    )
}
export default Header