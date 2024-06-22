import playstore from "../assets/playstore.png";
import appStore from "../assets/appStore.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* Larger than lg screens */}
      <div className="hidden lg:block mt-[2%]">
        <div className="flex flex-row font-roboto mt-[7%] justify-around bg-slate-950 py-3 box-border items-center">
          <div className="flex flex-col gap-y-5 text-white font-stylish">
            <h1 className="font-roboto">Download our app</h1>
            <h1 className="font-roboto">
              Download app for IOS and Android Mobile Phone
            </h1>
            <div className="w-[75%] flex flex-row items-center justify-around bg-black box-border p-3 border-0 rounded-2xl">
              <img className="h-16 w-16" src={playstore} alt="" />
              <div className="flex flex-col">
                <h3>Get on the</h3>
                <h1 className="text-2xl">Google Play</h1>
              </div>
            </div>
            <div className="w-[75%] flex flex-row items-center justify-around bg-black box-border p-1 border-0 rounded-2xl">
              <img className="h-20 w-18" src={appStore} alt="" />
              <div className="flex flex-col">
                <h3>Download on the</h3>
                <h1 className="text-2xl">App Store</h1>
              </div>
            </div>
          </div>
          <div className="mb-5 text-white text-center">
            <h1 className="mb-5 font-roboto text-red-800 text-6xl font-extrabold tracking-wider">
              ECOMMERCE.
            </h1>
            <div className="flex flex-col gap-y-3 tracking-widest">
              <h3 className="font-roboto l">
                High Quality is our First Priority
              </h3>
              <h3 className="font-roboto">Copyright 2023 @Recky776</h3>
            </div>
          </div>
          <div className="text-white text-center flex flex-col gap-y-2">
            <h1 className="text-xl">Follow Us</h1>
            <div className="flex flex-col gap-y-2">
              <Link
                className="text-white hover:text-teal-200"
                to="https://www.youtube.com/"
              >
                Youtube
              </Link>
              <Link
                className="text-white hover:text-teal-200"
                to="https://twitter.com/hamza14214799"
              >
                Twitter
              </Link>
              <Link
                className="text-white hover:text-teal-200"
                to="https://www.facebook.com/profile.php?id=100010621753103"
              >
                Facebook
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Smaller than lg screens */}
      <div className="mt-[2%] lg:hidden bg-slate-950 py-2">
        <div className="w-[100%] flex flex-col gap-y-5 font-roboto mt-[9%] justify-around  py-3 box-border items-center">
          <div className="mb-5  text-white text-center">
            <h1 className="mb-5 font-roboto text-red-800 text-xl sm2:text-3xl mmd:text-6xl font-extrabold tracking-wider">
              ECOMMERCE.
            </h1>
            <div className="flex flex-col text-sm sm2:text-lg w-[100%] gap-y-3 tracking-widest">
              <h3 className="font-roboto  ">
                High Quality is our First Priority
              </h3>
              <h3 className="font-roboto">Copyright 2023 @Recky776</h3>
            </div>
          </div>
          <div className="flex-col text-sm sm2:text-lg gap-y-8 mx-auto flex w-[90%] text-center bsm:w-[80%]  bsm:flex-row bsm:flex-wrap bsm:justify-between items-center">
            <div className="flex flex-col gap-y-5 text-white font-stylish">
              <h1 className="font-roboto">Download our app</h1>
              <h1 className="font-roboto">
                Download app for IOS and Andoid Mobile Phone
              </h1>
              <div className="mx-auto w-[85%] msm:w-[70%] flex flex-row items-center justify-around bg-black box-border p-3 border-0 rounded-2xl">
                <img className="h-12 w-12 mmd:h-16 mmd:w-16" src={playstore} alt="" />
                <div className="text-xs msm:text-sm md:text-2xl flex flex-col">
                  <h3>Get on the</h3>
                  <h1 className="text-sm md:text-2xl">Google Play</h1>
                </div>
              </div>
              <div className="mx-auto w-[85%] msm:w-[70%] flex flex-row items-center justify-around bg-black box-border p-3 border-0 rounded-2xl">
                <img className="h-12 w-12 mmd:h-20 mmd:w-18" src={appStore} alt="" />
                <div className="text-xs msm:text-sm md:text-2xl flex flex-col">
                  <h3>Download on the</h3>
                  <h1 className="text-xs msm:text-sm md:text-2xl">App Store</h1>
                </div>
              </div>
            </div>

            <div className="text-white text-center flex flex-col gap-y-2">
              <h1 className="text-xl">Follow Us</h1>
              <div className="flex flex-col gap-y-2">
                <Link
                  className="text-white hover:text-teal-200"
                  to="https://www.youtube.com/"
                >
                  Youtube
                </Link>
                <Link
                  className="text-white hover:text-teal-200"
                  to="https://twitter.com/hamza14214799"
                >
                  Twitter
                </Link>
                <Link
                  className="text-white hover:text-teal-200"
                  to="https://www.facebook.com/profile.php?id=100010621753103"
                >
                  Facebook
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
