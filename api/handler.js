import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

// const workingDirectory = process.cwd();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workingDirectory = __dirname;

// const imagePath = path.join('public', imagePaths.src);
// const outputPath = path.join('public', imagePaths.dest);
const outputPath = 'uploads'
const downloadPath = 'download'
const imageDirectory = path.join(workingDirectory, outputPath);


const dirPath = path.join(__dirname, '/uploads');

async function instantiateSharpImage(image, imageRequestInfo) {
  console.log('----> instantiating sharp <----')
  return sharp(image).withMetadata()
}

async function applyResize(sharpImage, edits) {
  // console.log('----> applying resize <----')
  edits.resize.width = Math.round(Number(edits.resize.width))
  edits.resize.height = Math.round(Number(edits.resize.height))
}

async function applyCompression(sharpImage, compressions) {
  console.log('----> compressing image <----')
  const { format, quality } = compressions

  const options = {
    quality
  }

  switch (format) {
    case 'png':
      return sharpImage.png(options)
    case 'jpg':
      // jpegQuality,
      return sharpImage.jpeg(options)
    case 'mozjpeg':
      return sharpImage.jpeg({ ...options, mozjpeg: true })
    case '.webp':
      return sharpImage.webp(options)
    // default:
    //   // return sharp(image).withMetadata()
    //   break
  }
}

async function applyEdits(sharpImage, edits) {
  console.log('----> editing image <----')
  // await applyResize(sharpImage, edits)

  for (const edit in edits) {
    console.log(`edit: ${JSON.stringify(edit)}`)
    switch (edit) {
      case 'resize':
        await applyResize(sharpImage, edits)
        sharpImage.resize(edits.resize)
      default:
        if (edit in sharpImage) {
          sharpImage[edit](edits[edit])
        }
        break;
    }
  }

  return sharpImage
}

/**
 * Creates destination to save images
 */
async function createDestinationFolder() {
  // new Promise((resolve, reject) => {

  //   fs.access(`./uploads/${folder}`, async(error) => {
  //     if (error) {
  //       console.log('create folder')
  //       resolve(fs.mkdirSync(`./uploads/${folder}`))
  //     }
  //   });
  // })

  const timestamp = new Date().toISOString();
  const key = uuidv4()
  const tempFolder = `${timestamp}-${key}`

  const destination = path.join(imageDirectory, tempFolder)

  await fs.promises.mkdir(destination, { recursive: true })

  return {
    destination,
    destinationFolder: tempFolder
  }
}

async function saveImage(destination, originalname, modifiedImage, outputFormat) {
  const ref = `${originalname}.${outputFormat}`;
  
  const outputPath = path.join(destination, ref)
  console.log(`outputPath: ${outputPath}`)

  await modifiedImage.toFile(outputPath, (err, info) => {
    if (err) {
      console.log(`err: `, err)
      throw Error()
    }
  })

  // modifiedImage.toBuffer((err, data, info) => {
  //   if (err) throw Error('Failed to save image')
  //   if (data) fs.writeFile(outputPath, data, err => {
  //     console.log('done')
  //   })
  // })
}

export async function processMultipleImages(imageRequestInfo) {
  console.log('----> Processing images <----')
  const { originalImages, edits, compressions, outputFormat, fixQuality } = imageRequestInfo
  let optimizedImages = []

  const { destination, destinationFolder } = await createDestinationFolder()
  // console.log(`destination: ${destination}`)

  const recordKey = destinationFolder
  // console.log(`recordKey: ${recordKey}`)

  if (edits) {
    for (const image of originalImages) {
      // convert image to sharp object
      const sharpImage = await instantiateSharpImage(image.buffer)

      // optimize image
      let modifiedImage = await applyCompression(sharpImage, compressions)
      modifiedImage = await applyEdits(modifiedImage, edits)

      await saveImage(destination, image.name, modifiedImage, outputFormat)
      console.log(modifiedImage)
      optimizedImages.push(modifiedImage)
    }

   } else {
    console.log('no edits specified. default optimize')
   }

  return recordKey
}