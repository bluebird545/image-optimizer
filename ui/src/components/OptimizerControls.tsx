import React, { useRef, useState } from 'react';
import { optimizeImages } from '@services/file-optimize';

import { useContext } from 'react';
import { AlertContext } from '../context/alert';
import { Image } from '../types';

type OptimizerControlsProps = {
  images: Image[]
  onSetRecordKey: Function
}

const OptimizerControls = ({ images, onSetRecordKey }: OptimizerControlsProps) => {
  const alertCtx = useContext(AlertContext)

  const resizeRef = useRef(null)
  const [showResize, setShowResize] = useState<boolean>(false)

  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [quality, setQuality] = useState<string>('80');
  const [format, setFormat] = useState<string>('jpg');
  
  const qualityOptions = []
  
  for (let i = 10; i <= 100; i += 10) {
    qualityOptions.push(<option key={i} value={i}>{i}</option>)
  }

  const handleShowResize = () => {
    if (showResize) {
      setWidth('');
      setHeight('');
    }

    setShowResize(showResize => !showResize);
  }

  const optimize = async(e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const recordKey = await optimizeImages(images, quality, width, height, format);
      onSetRecordKey(recordKey);
    } catch (error) {
      alertCtx.onError('Something went wrong. Unable to optimize images');
    }
  }

  return(
    <div className='w-1/3 h-full px-6 mx-auto md:col-span-2'>
      <form onSubmit={(e) => optimize(e)} className='text-slate-600 max-h-full overflow-hidden'>
        <div className='space-y-6'>
          <div className='text-slate-600 text-xl font-medium tracking-wide'>Compression Options</div>

          <div className='relative'>
            <select id="format" defaultValue={format} onChange={(e) => setFormat(e.target.value)} className='block px-3 pt-8 pb-2.5 w-full text-slate-800 font-light border border-orange-200 rounded-lg bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-blue-300 hover:border-blue-300 hover:cursor-pointer'>
              <option value="jpg">JPEG</option>
              <option value="png">PNG</option>
              <option value="webp">WEBP</option>
            </select>
            <label htmlFor="format" className='absolute text-sm tracking-wide font-medium transform -translate-y-4 top-6 z-10 origin-[0] start-2.5 text-slate-500'>Convert Format</label>
          </div>


          <div className='relative p-3 border border-orange-200 rounded-lg hover:border-blue-300'>
            <label htmlFor="format" className='absolute text-sm tracking-wide font-medium transform -translate-y-4 top-6 z-10 origin-[0] start-2.5 text-slate-500'>Quality</label>
            <span className='absolute text-xl tracking-wide font-medium transform -translate-y-4 top-6 right-3 z-10  text-slate-500'>{quality}</span>

            <input 
              type="range"
              id="quality"
              value={quality}
              min={10} max={100} step={1}
              onChange={(e) => setQuality(e.target.value)}
              className='range mt-8 h-3 w-full bg-orange-200 rounded-lg overflow-hidden appearance-none hover:cursor-pointer' 
            />
          </div>

          
          <div className='text-slate-600 text-xl font-medium tracking-wide'>Edit Options</div>

          <div className='relative p-3 border border-orange-200 rounded-lg hover:border-blue-300'>
            <label role='switch' htmlFor="resize" className='w-full relative inline-flex items-center justify-between cursor-pointer'>
              <span className='mr-3 text-sm font-medium text-slate-500'>Resize</span>

              <input type="checkbox" id='resize' value="" className="sr-only peer" onChange={() => handleShowResize()} />

              <div className="w-11 h-6 bg-gray-200 rounded-full border-2 border-transparent cursor-pointer transition-colors duration-200 peer-checked:bg-none peer-focus:ring-4 peer-checked:text-orange-300 peer-checked:bg-orange-200 peer-focus:ring-orange-100 focus:peer-focus:ring-blue-200 before:content-[''] before:inline-block before:h-5 before:w-5 before:rounded-full before:shadow-md before:bg-white before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 peer-checked:before:bg-blue-300 before:translate-x-0 peer-checked:before:translate-x-full"></div>
            </label>
            
            <div ref={resizeRef} className='grid gap-x-6 md:grid-cols-2 items-center justify-center transition-all duration-200 overflow-hidden' style={{maxHeight: showResize ? `${resizeRef.current.scrollHeight + 100}px` : '0px', marginTop: showResize ? '1.5rem' : '0'}}>
              <div className='relative'>
                <label htmlFor="width" className='sr-only'>Width</label>
                <span className='absolute top-2 right-0 mr-2 text-xs text-slate-400'>W</span>
                <input type="number" id="width" value={width} min={0} onChange={e => setWidth(e.target.value)} className='w-full border border-orange-300 rounded-lg pl-1.5 py-0.5 focus:outline-none focus:ring-0 focus:border-blue-300 hover:border-blue-300' />
              </div>

              <div className='relative'>
                <label htmlFor="height" className='sr-only'>Height</label>
                <span className='absolute top-2 right-0 mr-2 text-xs text-slate-400'>H</span>
                <input type="number" id="height" value={height} min={0} onChange={e => setHeight(e.target.value)} className='w-full border border-orange-300 rounded-lg pl-1.5  py-0.5 focus:outline-none focus:ring-0 focus:border-blue-300 hover:border-blue-300' />
              </div>
            </div>          
          </div>

          <div className='text-slate-600 text-xl font-medium tracking-wide'>Output Options</div>
          Prefix name of files
        </div>

        <div className='p-3 mt-16'>
          <button type='submit' className='w-full md:min-h-[70px] px-4 py-4 flex items-center justify-between mx-auto text-left text-slate-50 bg-slate-600 rounded-full shadow-md hover:bg-slate-800'>
            <span>Optimize</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
          </button>
        </div>
      </form>
    </div>
  )
}

export default OptimizerControls