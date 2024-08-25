"use client"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
const Processor = () => {

  const [videoLink, setVideoLink] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    console.log('Iwascalled')
    const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    const base64String = reader.result.split(',')[1]; // Remove the "data:*/*;base64," prefix
    // Prepare the JSON payload
    const payload = JSON.stringify({
      fileName: file.name,
      fileType: file.type,
      fileData: base64String,
    });
    console.log('Iwascalledagain')
    setFile(payload)
    console.log('Iwascalledandagain')
    handleProcessVideo()
    console.log('Iwascalled6')
  };
}

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
      } else if (file) {
        path={'videoPath': file};
      } else {
        setMessage('Please provide a video link or upload a file.');
        return;
      }

      const response = await fetch('/api/process-video', {
        headers:{
          "Content-Type":"application/json"
        },
        method: 'POST',
        body: JSON.stringify(path),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage(error.message);
    }
  };


  return (
    <div className='flex flex-col w-full overflow-hidden  justify-center items-center h-[50vh] lg:h-[100vh] lg:h-[80vh]'>
       <span className="text-2xl lg:text-4xl text-gray-900  text-center font-bold p-3 mt-[7rem] mb-3">Drop Your Video</span>
       <div className="flex w-full items-center justify-center p-3">
      <input type="search" onKeyPress={handleKeyPress} onChange={(e)=>setVideoLink(e.target.value)} placeholder='Video Link' className='text-gray-900  text-sm placeholder-gray-600 lg:text-md bg-transparent rounded-md justify-self-center self-center border-2  border-gray-900 border-solid py-2 text-start lg:text-lg px-3 lg:p-2 lg:border-[3px] w-3/4 lg:w-1/3' />
      <button onClick={handleProcessVideo}  className="bg-black ml-3 py-2  hover:bg-gray-400 active:bg-gray-400 text-center lg:text-lg text-sm  px-3  rounded-lg text-white flex"><span  className='lg:flex font-bold hidden'>Upload</span> <span className='text-center text-2xl ml-2'><FontAwesomeIcon icon={faUpload}/></span></button>
      </div>
      <span className='text-xl p-3'>Or</span>
      <div className='flex w-full items-center justify-center p-3' >
      <label for="file-upload" class="flex flex-col items-center justify-center lg:w-1/2 w-3/4 h-32 border-2 border-dashed border-gray-900 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
    <div class="flex flex-col items-center justify-center pt-5 pb-6">
      <svg class="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4M15 8h4m0 0l-4 4m4-4l4 4m-4-4v12"></path>
      </svg>
      <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag and drop</p>
      <p class="text-xs text-gray-500">Mp4, Mkv(max. 800x400px)</p>
    </div>
    <input id="file-upload" on type="file" 
            onChange={handleFileChange} class="hidden" />
  </label>
      </div>

    </div>
  )
}

export default Processor
