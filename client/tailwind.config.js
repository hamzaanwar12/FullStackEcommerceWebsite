/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'stylish': 'Agbalumo',
        "logoStyle":"Dancing Script",
        "roboto":"Roboto",
        "simpleOne":"Dancing Script",
        "simpleTwo":"Josefin Sans",
        "simpleThree":"Josefin Sans"
      },
      colors: {
        "blue": '#3498db',
        "background": '#6239b5',
        "button":"#8080807d",
        'shadow-black': '#867d7d8c',
        // Add" more custom colors as needed
      },
      height:{
        "card":"24rem",
        "cardView":"24rem",
        "check":"18.5rem",
        "buttons":"15.5rem",
        "image":"10rem",
        "check2":"17rem",
        "recentCard":"19rem",
        "cardImg":"11rem",
        "Img":"12rem",
        "sImg":"6rem"
        
      },
      width:{
        "card":"24rem",
        "cardView":"24rem",
        "check":"18rem",
        "image":"9rem",
        "image2":"10rem",
        "buttons":"15.5rem",
        "smButtons":"10rem",
        "check2":"17rem",
        "recentCard":"18rem",
        "s2RecentCard":"14rem",
        "sRecentCard":"13rem",
        "cardImg":"12rem",
        "Img":"12rem",
        "sImg":"6rem"
      },
      fontSize: {
        'myFont': ['11px', { lineHeight: '6px' }],
        'smallFont': ['12px', { lineHeight: '8px' }],
      },
      screens:{
        'sm': '640px',
        'ssm': '200px',
        "msm":"300px",
        'sm2': '400px',
        "bsm":"641px", 
        'md': '768px', 
        'mmd': '990px',
        'lg': '991px',
         
      }
    },
  },
  plugins: [],
}