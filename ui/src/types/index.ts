export interface Image {
  src: string | ArrayBuffer
  name: string
  size: number
  originalFile: any
}

export interface File {
  url: string
  name: string
}

export type Optimization = {
  width?: number
  height?: number
  quality?: number
  format?: 'jpg' | 'png'
}

export interface Form extends Optimization {
  images: []
  progress: number
}

export interface AlertContextType {
  type: 'success' | 'error' | null
  message: string | null
  onSuccess: (message: string) => void
  onError: (message: string) => void
  onClear: VoidFunction
}

export interface ComponentProps {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
}

export interface BaseLayoutProps {
  children?: React.ReactNode;
}