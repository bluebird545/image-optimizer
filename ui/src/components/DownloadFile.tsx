import React, { useContext, useState } from 'react'
import { useDownloadFile } from '../hooks/useDownloadFile'
import { AlertContext } from '../context/alert'
import DownloaderButton from '@components/DownloadButton'

type DownloadFileProps = {
  recordKey: string
}
const DownloadFile: React.FC<DownloadFileProps> = ({ recordKey }) => {
  const alertCtx = useContext(AlertContext);

  const [buttonState, setButtonState] = useState<boolean>(false);

  const preDownloading = () => setButtonState(true);
  const postDownloading = () => setButtonState(false);

  const downloadFileError = (message: string) => {
    alertCtx.onError(message);
  }

  const { download, anchorRef, fileUrl, fileName } = useDownloadFile({
    recordKey,
    onError: downloadFileError,
    preDownloading,
    postDownloading
  });

  return (
    <div>
      <a ref={anchorRef} href={fileUrl} download={fileName} className='hidden' />
      <DownloaderButton onClick={download} buttonState={buttonState} />
    </div>
  )
}

export default DownloadFile