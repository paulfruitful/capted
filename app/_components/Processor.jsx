"use client"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Loader from './Loader'
import axios from 'axios';

const Processor = () => {

  const [videoLink, setVideoLink] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);


  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleProcessVideo();
    }
  };

  const handleProcessVideo = async () => {
    try {
      
      let path;
      if (videoLink) {
        path={'videoPath':videoLink};
      }else {
        setMessage('Please provide a video link or upload a file.');
        return;
      }

     setLoading(true)
      await axios.post('/api/process-video', path, {
        headers: {
          'Content-Type': 'application/json',
        },
        
      });

      setMessage('Processing successful!');
    } catch (error) {
      setMessage(error.message || 'Something went wrong');
    }finally{
      setLoading(false)
    }
  
  };


  return (
    <div className='flex flex-col w-full overflow-hidden  justify-center items-center h-[50vh] lg:h-[100vh] lg:h-[80vh] '>
       <span className="text-2xl lg:text-4xl text-gray-900  text-center font-bold p-3 mt-[7rem] mb-3">Drop Your Video</span>
       <div className="flex w-full items-center justify-center p-3">
      <input type="search" onKeyPress={handleKeyPress} onChange={(e)=>setVideoLink(e.target.value)} placeholder='Video Link' className='text-gray-900  text-sm placeholder-gray-600 lg:text-md bg-transparent rounded-md justify-self-center self-center border-2  border-gray-900 border-solid py-2 text-start lg:text-lg px-3 lg:p-2 lg:border-[3px] w-3/4 lg:w-1/3' />
      <button onClick={handleProcessVideo}  className="bg-black ml-3 py-2  hover:bg-gray-400 active:bg-gray-400 text-center lg:text-lg text-sm  px-3  rounded-lg text-white flex"><span  className='lg:flex font-bold hidden'>Upload</span> <span className='text-center text-2xl ml-2'><FontAwesomeIcon icon={faUpload}/></span></button>
      </div>
      {loading && <Loader />}
      {message && <div className="p-3 text-lg text-center">{message}</div>}


    </div>
  )
}

export default Processor
