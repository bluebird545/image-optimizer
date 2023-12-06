import React, { useCallback, useState } from 'react';
import Input from '@components/Input'
import FilePreview from '@components/FilePreview';
import OptimizerControls from '@components/OptimizerControls';
import DownloadFile from '@components/DownloadFile';
import { Image } from '../types';

const Uploader: React.FC = () => {
  const [images, setImages] = useState<Image[]>([])
  const [recordKey, setRecordKey] = useState<string>()

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
    Array.prototype.forEach.call(files, readAndPreview)
  }, [])

  return(
    <div className='w-full h-full flex items-center justify-center px-16'>
      { images.length === 0 && <Input onDrop={onDrop} /> }

      { images.length > 0 && (
        <div className='relative flex flex-wrap md:flex-nowrap'>
          <FilePreview images={images} onRemoveFile={setImages} />
          <OptimizerControls images={images} onSetRecordKey={setRecordKey} />
        </div>
      )}

      { recordKey && <DownloadFile recordKey={recordKey} />}
    </div>
  )
}
export default Uploader