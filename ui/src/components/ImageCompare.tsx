import React, { useRef } from 'react'

const ImageCompare: React.FC = () => {
  const editedImage = useRef(null)
  const slider = useRef(null)
  const containerRef = useRef(null)

  const sliding = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('sliding...')
    // const clippedImage = editedImage.current
    const value = `${event.target.value}%`
    // clippedImage.style.setProperty('--exposure', value)
    containerRef.current.style.setProperty('--position', value)
  }

  return (
    <>
      <h1>Image Compare</h1>
      
      <div ref={containerRef} className='image-compare-container relative h-full'>
        <img src="https://picsum.photos/seed/picsum/600/300" alt="" />
        <span className='absolute top-5 left-3 text-slate-50'>Original</span>

        <div ref={editedImage} className='clip-image-compare block absolute top-0'>
          <span className='absolute top-5 right-3 text-slate-50'>FileName.jpg</span>
          <img src="https://picsum.photos/seed/picsum/600/300?grayscale" alt="" />
        </div>

        {/* <label className='image-compare absolute top-0 left-0 bottom-0 right-0 flex items-center'>
          <span className='sr-only'>Sets the percentage of image to show</span>
          
          <input ref={slider} type="range" step={0.5} min={0} max={100} className='image-compare__slider absolute inset-0 opacity-0 cursor-col-resize peer' onChange={sliding} />

          <div ref={sliderButton} aria-hidden='true' className='image-compare__slider-button p-0 m-0 absolute h-11 w-11 left-1/2 top-1/2 -ml-[22px] -mt-[22px] bg-white translate-x-1/2 pointer-events-none'></div>

        </label> */}

        
        <input ref={slider} type="range" step={0.5} min={0} max={100} className='image-compare__slider absolute inset-0 opacity-0 cursor-col-resize peer' onChange={sliding} />

        <span aria-hidden='true' className='image-compare__slider-line absolute inset-0 w-0.5 h-full bg-slate-50 pointer-events-none'></span>
        <div aria-hidden='true' className='image-compare__slider-button flex items-center justify-between absolute top-1/2 w-11 h-11 -ml-[22px] -mt-[22px] bg-slate-50 text-black p-2 rounded-full shadow-md pointer-events-none peer-focus-visible:outline-4 peer-focus-visible:outline-black peer-focus-visible:outline-offset-4'>
          <svg xmlns="http://www.w3.org/2000/svg" className="" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M13 20l-3 -8l3 -8"></path>
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" className="" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M11 4l3 8l-3 8"></path>
          </svg>
        </div>
      </div>
    </>
  )
}

export default ImageCompare