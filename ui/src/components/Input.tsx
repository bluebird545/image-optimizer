import React, { useContext, useRef, useEffect } from 'react';
import { AlertContext } from '../context/alert';

type InputProps = {
  onDrop: Function
}

const Input: React.FC <InputProps> = ({ onDrop }) => {
  const acceptableFormats = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];

  const alertCtx = useContext(AlertContext);

  const drop = useRef(null)
  
  // add event listeners to drop zone
  useEffect(() => {
    drop.current.addEventListener('dragover', handleDragOver)
    drop.current.addEventListener('dragenter', handleDragOver)
    drop.current.addEventListener('dragleave', handleDragOver)
    drop.current.addEventListener('drop', handleDrop)
  }, [])

  const handleFiles = (fileList: FileList) => {
    const files = Array.from(fileList)
    // check count of files
    if (files.length > 10) {
      alertCtx.onError(`Cannot upload more than 10 images`);
      return;
    }

    // check formats of files
    if (acceptableFormats && files.some((file) => !acceptableFormats.some((format) => file.name.toLowerCase().endsWith(format.split('/')[1])))) {
      alertCtx.onError(`Only the following file formats are acceptable: ${acceptableFormats.join(', ')}`)
      return;
    }

    onDrop(files)
  }

  const handleDragOver = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLInputElement>): void => {
    e.preventDefault()
    e.stopPropagation()

    const { files } = e.dataTransfer

    handleFiles(files)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()

    const { files } = e.target

    handleFiles(files)
  }


  return(
    <div ref={drop} className='w-full flex items-center justify-center'>
      <label htmlFor="dropzone" className='px-8 h-64 flex flex-col items-center justify-center border-2 border-orange-200 rounded-lg cursor-pointer bg-blue-50 transition-colors duration-300 hover:bg-blue-100 group'>
        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
          <svg xmlns="http://www.w3.org/2000/svg" className='w-14 h-14 p-2 text-blue-50 bg-orange-300 rounded-lg mb-4 rotate-6 transition-transform duration-300 group-hover:rotate-0' viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M15 8h.01"></path>
            <path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5"></path>
            <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l3.5 3.5"></path>
            <path d="M14 14l1 -1c.679 -.653 1.473 -.829 2.214 -.526"></path>
            <path d="M19 22v-6"></path>
            <path d="M22 19l-3 -3l-3 3"></path>
          </svg>
          <p className='text-sm mb-2 text-slate-400 font-semibold'>Drop or browse to optimize up to 10 images</p>
          <p className='text-xs text-slate-400'>Acceptable Files: JPEG, PNG, & WEBP</p>
        </div>
        <input 
          type="file" 
          id="dropzone" 
          accept={acceptableFormats.join(', ')} 
          multiple
          onChange={handleChange}
          className="hidden" />
      </label>
    </div>
  );
}
export default Input