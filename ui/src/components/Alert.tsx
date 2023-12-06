import React, { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../context/alert'
import { AlertContextType } from '../types'

const Alert: React.FC = () => {
  const alertCtx = useContext(AlertContext) as AlertContextType

  // set style of alert box depending on type
  const [alertBoxStyles, setAlertBoxStyles] = useState('')
  const [alertBoxBtnStyles, setAlertBoxBtnStyles] = useState('')
  useEffect(() => {
    switch (alertCtx.type) {
      case 'success':
        setAlertBoxStyles(`bg-green-50 text-green-800`)
        setAlertBoxBtnStyles(`hover:bg-green-200`)
      case 'error':
        setAlertBoxStyles(`bg-red-50 text-red-800`)
        setAlertBoxBtnStyles(`hover:bg-red-200`)
    }

  }, [alertCtx.type])

  return (
    alertCtx.message !== null && (
      <div className={`absolute top-0 w-full z-30 max-w-screen-md mx-auto p-4 flex items-center justify-between rounded-lg font-medium ` + alertBoxStyles}>
        <p>{alertCtx.message}</p>

        <button onClick={alertCtx.onClear} className={`p-1.5 rounded-lg ` + alertBoxBtnStyles}>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M18 6l-12 12"></path>
          <path d="M6 6l12 12"></path>
        </svg>
        </button>
      </div>
    )
  )
}

export default Alert;