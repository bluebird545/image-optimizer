import { useRef, useState } from "react";
import { downloadImages } from "@services/file-optimize";
downloadImages

interface DownloadFileProps {
  recordKey: string
  readonly onError: (message: string) => void
  readonly preDownloading: () => void
  readonly postDownloading: () => void
}

interface DownloadFileInfo {
  readonly download: () => Promise<void>
  readonly anchorRef: React.MutableRefObject<HTMLAnchorElement | null>
  readonly fileName: string
  readonly fileUrl: string
}

export const useDownloadFile = ({ recordKey, onError, preDownloading, postDownloading }: DownloadFileProps): DownloadFileInfo => {
  const anchorRef = useRef<HTMLAnchorElement | null>(null)
  const [ fileUrl, setFileUrl ] = useState<string>()
  const [ fileName, setFileName ] = useState<string>()

  const download = async() => {
    try {
      preDownloading()
      const data: any = await downloadImages(recordKey)

      // create url form blob
      const url = URL.createObjectURL(new Blob([data], { type:'application/zip' }))

      // using useState is too slow
      // href & download of anchorRef is not updated in time for click()
      // setFileUrl(url)
      // setFileName('file.zip')

      // set anchorRef hrefl download and trigger click
      anchorRef.current.href = url
      anchorRef.current.download = 'file.zip'
      anchorRef.current.click()

      postDownloading()
      URL.revokeObjectURL(url)

      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', 'file.zip');
      // document.body.appendChild(link);
      // link.click();
      // link.parentNode.removeChild(link);
    } catch (error) {
      onError(error)
    }
  }

  return { download, anchorRef, fileUrl, fileName }
}

// resource:
// https://levelup.gitconnected.com/react-custom-hook-typescript-to-download-a-file-through-api-b766046db18a