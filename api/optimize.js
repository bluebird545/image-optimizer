import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

import { getNormalSize, formatBytes } from './utils/helper.js';
import * as imageRequest from './request.js';
import * as imageHandler from './handler.js'

let width
let height
let format
let quality = 80
let prefix = 'scaled'

const DEFAULT_CONFIG = {
  quality: 80,
  // prefix: 'scaled',
  // sizes: [500, 300, 30],
  format: false
}

let config = {
  ...DEFAULT_CONFIG
}

let images = [];

async function createDestinationFolder(destinationFile) {
  // console.log
  // const file = path.parse(destinationFile + '.txt');
  // console.log(file.dir);
  // await fs.promises.mkdir(file.dir, { recursive: true });
}

function getDestinationFilePathless(source, s) {
  // let destination = path.join(workingDirectory, outputPath, s.toString(), source);
  // destination = destination.replace(path.parse(destination).ext, '');
  // return destination;

  // outputImageName = 'scaled_' + image.substr(0, image.lastIndexOf(".")) + height + 'x' + width + `.${format}`;
  // outputImagePath = './build/images/' + outputImageName;

  let name = source.substr(0, source.lastIndexOf(".")) + `.${format}`
  
  let destination = path.join(workingDirectory, OUTPUT_PATH, name)

  // if (format)
  //   destination = destination.replace(path.parse(destination).ext, ``);

  return destination
}


const upload = () => {
  console.log('----> UPLOADING <----')

  fs.writeFile(OUTPUT_PATH, '', (err, info) => {
    if (err) console.error(err)
    else console.log(info)
  })
}

export default async(file, query) => {
  console.log('----> Started optimizing image(s) <----')
  try {
    const imageRequestInfo = await imageRequest.setup(file, query)
    console.info('----> imageRequestInfo <----')
    console.info(imageRequestInfo)
    
    const processedRequest = await imageHandler.processMultipleImages(imageRequestInfo)
    console.info('----> processedRequest <----')
    console.info(processedRequest)
    return processedRequest
  } catch (error) {
    console.log(error)
    throw new Error('Something went wrong')
  }
}