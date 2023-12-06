import React, { useCallback, useState } from 'react';
import Input from '@components/Input'
import FilePreview from '@components/FilePreview';
import OptimizerControls from '@components/OptimizerControls';
import DownloadFile from '@components/DownloadFile';
import { Image } from '../types';

import ImageCompare from './ImageCompare';

type Form = {
  images: [] | null
  // progress: string | null
  width?: string | null
  height?: string | null
  quality?: string | null
  format?: 'jpg' | 'png' | null
}

const fakeImages = [
  {
    src: 'https://picsum.photos/id/237/200/300',
    name: 'Black Puppy',
    size: 1000,
    originalFile: '',
  },
  {
    src: 'https://picsum.photos/id/56/200/300',
    name: 'Black Puppy',
    size: 1000,
    originalFile: '',
  },
  {
    src: 'https://picsum.photos/id/237/200/300',
    name: 'Black Puppy',
    size: 1000,
    originalFile: '',
  },
  {
    src: 'https://picsum.photos/id/56/200/300',
    name: 'Black Puppy',
    size: 1000,
    originalFile: '',
  },
  {
    src: 'https://picsum.photos/id/237/200/300',
    name: 'Black Puppy',
    size: 1000,
    originalFile: '',
  },
  {
    src: 'https://picsum.photos/id/56/200/300',
    name: 'Black Puppy',
    size: 1000,
    originalFile: '',
  },
  {
    src: 'https://picsum.photos/id/237/200/300',
    name: 'Black Puppy',
    size: 1000,
    originalFile: '',
  },
  {
    src: 'https://picsum.photos/id/56/200/300',
    name: 'Black Puppy',
    size: 1000,
    originalFile: '',
  },
  {
    src: 'https://picsum.photos/id/237/200/300',
    name: 'Black Puppy',
    size: 1000,
    originalFile: '',
  },
  {
    src: 'https://picsum.photos/id/56/200/300',
    name: 'Black Puppy',
    size: 1000,
    originalFile: '',
  },
]

const Uploader: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null)
  const [images, setImages] = useState<Image[]>([])
  // const [files, setFiles] = useState([])
  const [form, setForm] = useState<Form>({ images: null, quality: '80', width: null, height: null, format: null })
  const [recordKey, setRecordKey] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  // read each file and create preview
  const readAndPreview = (file: any) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setImages((prevImages) =>( 
        [
          ...prevImages,
          {
            src: reader.result,
            name: file.name,
            size: file.size,
            originalFile: file
          }
        ]
      ))
    };

    reader.onabort = () => alert('File reading aborted')
    reader.onerror = () => alert('Failed to read file')

    reader.readAsDataURL(file)
  }

  const onDrop = useCallback((files: FileList) => {
    console.log('onDrop')
    console.log(files)
    Array.prototype.forEach.call(files, readAndPreview)
  }, [])

  return(
    <div className='w-full h-full flex items-center justify-center px-16'>
      { images.length === 0 && <Input onFileSelect={setFiles} onDrop={onDrop} /> }

      { images.length > 0 && (
        // <div className='max-w-screen-lg mx-auto relative grid bg-white md:grid-cols-5'>
        <div className='relative flex flex-wrap md:flex-nowrap'>
          <FilePreview images={images} onRemoveFile={setImages} />
          <OptimizerControls images={images} onSetRecordKey={setRecordKey} />
        </div>
      )}

      { recordKey && <DownloadFile recordKey={recordKey} />}

      {/* <ImageCompare /> */}
    </div>
  )
}
export default Uploader