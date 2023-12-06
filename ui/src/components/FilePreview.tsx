import React from 'react';
import prettyBytes from 'pretty-bytes'
import { Image } from '../types';

type PreviewProps = {
  images: Image[]
  onRemoveFile: Function
}

const FilePreview = ({ images, onRemoveFile }: PreviewProps) => {
  const removeImage = (index: number) => {
    const newImages = images; // set images to new array to preserve images
    newImages.splice(index, 1); // remove image
    onRemoveFile([...newImages]); // set images
  }

  return(
    <div className='w-2/3 bg-gradient-to-b from-orange-50 to-blue-50 rounded-lg px-6 md:col-span-4'>      
      <div className='mt-6 mb-6 flex items-center justify-center shrink-0 flex-wrap gap-x-4 gap-y-4'>
        {
          images.map((img, i) => (
            <div key={i} className='relative'>
              <button onClick={() => removeImage(i)} className='h-5 w-5 p-0.5 absolute -right-2 -top-2 z-20 bg-red-500 rounded-full transition-transform duration-200 hover:scale-125 group'>
                <svg xmlns="http://www.w3.org/2000/svg" className="text-white h-full w-full" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M18 6l-12 12"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              </button>

              <p className='absolute top-2 left-2 text-slate-200 text-xs'>{img.name}</p>

              <div className='h-[150px] w-[150px] overflow-hidden'>
                <img src={img.src.toString()} alt='' className='h-full w-full rounded-lg object-cover' />
              </div>
              <p className='text-xs'>Size: {prettyBytes(img.size)}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default FilePreview