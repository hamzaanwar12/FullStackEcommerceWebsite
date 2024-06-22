const style = {
    form: ' font-roboto  flex flex-col items-center gap-y-3 mmd:gap-y-5 px-5 py-2 w-[99%] md:w-[85%] mmd:w-[60%] box-border m-auto  rounded-3xl drop-shadow-xl shadow-black-500/50 backdrop-blur-lg ',
    formDiv: "flex flex-col w-[100%] gap-y-3 text-sm mmd:text-lg md:w-[80%] items-between",
    input: "h-4 mmd:h-8 p-1 mmd:p-2 bg-transparent font-mono text-sm mmd:text-lg text-gray-700 border-0 font-thin outline-0 border-b-2 ",
    errorDiv: "text-red-700 w-[100%] text-center",
    button:"w-[99%] md:w-[70%] mmd:w-[30%] h-12 bg-black text-xl cursor-pointer text-white rounded-sm border-2   hover:bg-white hover:text-black hover:border-0 focus:bg-transparent focus:text-black focus:border-2 focus:border-black",
    specialInput:" bg-transparent h-8 p-2 font-mono text-lg text-gray-700 w-[100%] border-0 font-thin outline-0 border-b-2 ",
    errorDiv:"text-red-500"
}


const changeStyle = {
    form: ' font-roboto w-[100%] font-extrabold flex flex-col gap-y-0 sm2:gap-y-3  px-2 py-2 box-border rounded-3xl',
    formDiv: "flex flex-col gap-y-0  ",
    input: "w-[100%] h-3 mmd:h-5  p-0 mmd:p-1 bg-transparent font-mono text-base mmd:text-lg text-gray-700 border-0 font-thin outline-0 border-b-2 border-gray-400",
    specialInput: "w-[100%] h-3 my-1 mmd:h-5 p-2 bg-transparent font-mono text-lg text-gray-700 border-0 font-thin outline-0 border-b-2 border-b-2  border-gray-500",
    errorDiv:"text-red-500 text-xs"
}


const EditStyle = {
    form: ' font-roboto box-border flex flex-col items-center gap-y-5 px-5 py-2 w-[100%] box-border m-auto  rounded-3xl drop-shadow-xl shadow-black-500/50 backdrop-blur-lg ',
    formDiv: "flex w-[100%] mmd:w-[98%] justify-between items-center",
    input: "h-8 bg-gray-800 text-white p-1 mmd:p-2 w-[95%] font-simpleTwo text-sm mmd:text-lg text-white border-0 font-thin outline-0 border-b-2 ",
    errorDiv: "text-red-700 text-sm w-[100%] text-center",
    button:"w-[100%] sm:w-[75%] mmd:w-[30%] h-12 bg-black text-sm sm:text-base mmd:text-xl text-white cursor-pointer rounded-sm   h-12 hover:bg-white  hover:text-black hover:border-black hover:border-2  active:bg-black active:text-white ",
    errorDiv:"text-red-500 text-sm"
}


export default style
export {changeStyle,EditStyle}