import { Dna } from 'react-loader-spinner'

const CirclesWithBarLoader = () => {
    return (
        <Dna
            visible={true}
            height="100%"
            width="100%"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
        />
        /*
        <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
        />*/
        /*       <CirclesWithBar
               
                   height="100%"
                   width="100%"
                   color="#4fa94d"
                   wrapperStyle={{}}
                   wrapperClass=""
                   visible={true}
                   outerCircleColor=""
                   innerCircleColor=""
                   barColor=""
                   ariaLabel='circles-with-bar-loading'
               />
               */
    )
}




export default CirclesWithBarLoader