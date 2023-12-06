import React from 'react'

type DownloaderProps = {
  buttonState: boolean
  readonly onClick: () => void
}

const DownloaderButton: React.FC<DownloaderProps> = ({ buttonState, onClick }) => {

  const isLoading = buttonState;

  return (
    <button onClick={onClick} className='px-3 py-4 border border-teal-600 rounded-full hover:bg-teal-600 hover:text-white'>
      { 
        isLoading 
        ? <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 6l0 -3"></path>
            <path d="M16.25 7.75l2.15 -2.15"></path>
            <path d="M18 12l3 0"></path>
            <path d="M16.25 16.25l2.15 2.15"></path>
            <path d="M12 18l0 3"></path>
            <path d="M7.75 16.25l-2.15 2.15"></path>
            <path d="M6 12l-3 0"></path>
            <path d="M7.75 7.75l-2.15 -2.15"></path>
        </svg> 
        : <svg xmlns="http://www.w3.org/2000/svg" className="" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
          <path d="M7 11l5 5l5 -5" />
          <path d="M12 4l0 12" />
        </svg>
      }
    </button>
  )
}

export default DownloaderButton