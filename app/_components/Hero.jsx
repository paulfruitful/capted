import React from 'react'

const Hero = ({kanit,mulish}) => {
  return (
    <div className='flex flex-col w-full overflow-hidden justify-center items-center h-[50vh] lg:h-[100vh] lg:h-[80vh]'>
       <img className=' absolute  rounded-sm h-[50vh] lg:h-[100vh] lg:h-[80vh] ' style={{width:'100vw'}} src="https://media2.giphy.com/media/rKc8ZWoh5XFuecNF13/giphy.gif" alt="" />
      <div className="absolute  rounded-sm h-[50vh] w-full lg:h-[100vh] bg-[#000000B3] "></div>
      <div className="flex relative flex-col justify-self-center  items-center h-[36vh] lg:h-[66vh] self-center justify-center" >
        <span className={`lg:text-5xl px-2 bg-white rounded-sm text-xl lg:p-3 ${mulish.className} font-extrabold text-center text-gray-900`}>Caption, Design & Translate Videos </span>
        <span className={`lg:text-2xl lg:pt-3 text-md ${mulish.className} text-center text-gray-100`}> Create engaging videos effortlessly </span>
        <a href='#roadmapper' className="bg-black mt-3 lg:mt-6 hover:bg-gray-400 active:bg-blue-400 text-center lg:text-xl text-sm  p-3 lg:p-6 rounded-xl text-white">Start Now🚀</a>

      
      </div>
  
    </div>
  )
}

export default Hero 
