import { useState } from "react"
import { pageStyles } from "./styl.js"

const Search = () => {
    const [search, setSearch] = useState(null)
    const changeHandler = (event) => {
        setSearch(event.target.value)
    }

    const SearchHandler = (event) => {
        event.preventDefault()
        if (search === null) {
            alert("Please Enter Something to Search")
        }

        else if (search.trim().length == 0 || search.trim() === "") {
            alert("Nothing to Seacrh")
        }
        else
        {
            
        }
    }

    return (
        <>

            
            <div style={{ ...pageStyles, height: "100vh" }} >
                <form onSubmit={SearchHandler} className="font-roboto w-[30%] mb-10 mx-auto flex items-center">
                    <input type="text" className=" h-12 w-[100%] outline-none hover:outline-none active:outline-none focus:outline-none border-none p-2 text-lg italic" value={search} onChange={changeHandler} />
                    <button type="submit" className="font-stylish bg-red-500 text-center w-32 text-white  text-md p-3 border-red-500  hover:border-2 active:border-none active:bg-red-500 active:text-white hover:text-red-500 hover:border-red-500 hover:bg-white ">Search</button>
                </form>
            </div >
        </>
    )
}

export default Search 