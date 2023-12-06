import path from 'path'
import fs from 'fs'
import { formatBytes } from './utils/helper.js';

const DIRECTORY = process.cwd(); // gives current working directory

const INPUT_DIR = 'test_images';
const OUTPUT_DIR = 'optimized_images';

const imageDirectory = path.join(DIRECTORY, INPUT_DIR)

const imagesToProcess = []

/**
 * Parses original image info
 * @param file Image passed in POST
 * @returns Original image
 */
async function getOriginalInfo(file) {
  // console.log(`getting original file info`)
  // console.log(file)
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
  console.log('----> Configuring edits <----')

  const { width, height } = query

  return {
    ...(width && { resize: { width: parseInt(width, 10), height: height ? parseInt(height, 10) : parseInt(width, 10) } }),
  }
}

// /**
//  * Determines image(s) output format
//  * @param imageRequestInfo Image request information
//  */
// function determineOutputFormat(imageRequestInfo) {
//   const outputFormat = 
// }

/**
 * Create image request used by image handler to optimize image(s)
 * @param files Images passed in POST request
 * @param query Request query
 * @returns Image request information
 */
// export async function setup(file, query, params) {
export async function setup(files, query) {
  console.log('----> Setting up image request object <----')
  
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

  // determine output format
  // if (imageRequestInfo.edits.format) {
  //   determineOutputFormat(imageRequestInfo)
  // }

  return imageRequestInfo
}