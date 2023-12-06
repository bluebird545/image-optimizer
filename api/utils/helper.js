import prettyBytes from 'pretty-bytes';

export function getNormalSize({ width, height, orientation }) {
  return (orientation || 0) >= 5
    ? { width: height, height: width }
    : { width, height };
}

export function formatBytes(bytes) {
  // console.log(`bytes: ${bytes}`)
  return prettyBytes(bytes)
}

// export function formatBytes(bytes, decimals = 2) {
//   if (!+bytes) return '0 Bytes'

//   const k = 1024
//   const dm = decimals < 0 ? 0 : decimals
//   const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

//   const i = Math.floor(Math.log(bytes) / Math.log(k))

//   return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
// }