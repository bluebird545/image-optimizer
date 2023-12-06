import path from 'path'

/**
 * Parses original image info
 * @param file Image passed in POST
 * @returns Original image
 */
async function getOriginalInfo(file) {
  const { buffer, originalname, size } = file;
  const extension = path.extname(originalname); // path.parse(file.name).ext
  const fileSizeInBytes = size;

  return {
    buffer,
    name: path.parse(originalname).name,
    size: fileSizeInBytes,
    ext: extension,
  }
}

/**
 * Configure compressions to be made to original image(s)
 * @param query Request query
 * @returns The compression options to be made to image(s)
 */
function configureCompressions(query) {
  const { quality, format } = query

  return {
    format,
    quality: parseInt(quality, 10)
  }
}

/**
 * Configure the edits to be made to original image(s)
 * @param query Request query
 * @returns The edits to be made to image(s)
 */
function configureEdits(query) {
  const { width, height } = query

  return {
    ...(width && { resize: { width: parseInt(width, 10), height: height ? parseInt(height, 10) : parseInt(width, 10) } }),
  }
}

/**
 * Create image request used by image handler to optimize image(s)
 * @param files Images passed in POST request
 * @param query Request query
 * @returns Image request information
 */
// export async function setup(file, query, params) {
export async function setup(files, query) {  
  let imageRequestInfo = {
    compressions: null,
    edits: null,
    originalImages: []
  }

  // configure compression options
  imageRequestInfo.compressions = configureCompressions(query)

  // configure edits from request
  imageRequestInfo.edits = configureEdits(query)

  if (query.quality) imageRequestInfo.fixQuality = parseInt(query.quality, 10)
  if (query.format) imageRequestInfo.outputFormat = query.format

  // get original image info
  for (let i = 0; i < files.length; i++) {
    const original = await getOriginalInfo(files[i])
    imageRequestInfo.originalImages.push(original)
  }

  return imageRequestInfo
}