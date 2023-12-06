// https://jujuontheweb.medium.com/react-usecontext-hook-to-make-an-alert-notification-system-for-your-entire-application-721b4c6b7d0f
// https://blog.logrocket.com/how-to-use-react-context-typescript/#create-to-do-type

import React, { createContext, useState } from 'react'
import { AlertContextType, BaseLayoutProps, ComponentProps } from '../types'

export const STATES = {
  SUCCESS: 'success',
  ERROR: 'error'
}

export const AlertContext = createContext<AlertContextType>({
  type: null,
  message: null,
  onSuccess: () => {},
  onError: () => {},
  onClear: () => {},
})

const AlertProvider: React.FC<BaseLayoutProps> = ({ children }) => {
  const [type, setType] = useState(null)
  const [message, setMessage] = useState(null)

  const onSuccess = (message: string) => {
    console.log(`onSuccess`)
    setType(STATES.SUCCESS)
    setMessage(message)
  }

  const onError = (message: string) => {
    console.log(`onError`)
    setType(STATES.ERROR)
    setMessage(message)
  }

  const onClear = () => {
    console.log(`onClear`)
    setType(null)
    setMessage(null)
  }

  return (
    <AlertContext.Provider 
      value={{
        type, message, onSuccess, onError, onClear
      }}
    >
      { children }
    </AlertContext.Provider>
  )
}

export default AlertProvider;