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
    setType(STATES.SUCCESS)
    setMessage(message)
  }

  const onError = (message: string) => {
    setType(STATES.ERROR)
    setMessage(message)
  }

  const onClear = () => {
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