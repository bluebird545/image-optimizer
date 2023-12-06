import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workingDirectory = __dirname;

const outputPath = 'uploads'
const imageDirectory = path.join(workingDirectory, outputPath);

async function instantiateSharpImage(image, imageRequestInfo) {
  return sharp(image).withMetadata()
}

async function applyResize(edits) {
  edits.resize.width = Math.round(Number(edits.resize.width))
  edits.resize.height = Math.round(Number(edits.resize.height))
}

async function applyCompression(sharpImage, compressions) {
  const { format, quality } = compressions

  const options = { quality }

  switch (format) {
    case 'png':
      return sharpImage.png(options)
    case 'jpg':
      return sharpImage.jpeg(options)
    case 'mozjpeg':
      return sharpImage.jpeg({ ...options, mozjpeg: true })
    case '.webp':
      return sharpImage.webp(options)
  }
}

async function applyEdits(sharpImage, edits) {
  for (const edit in edits) {
    switch (edit) {
      case 'resize':
        await applyResize(edits)
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

  await modifiedImage.toFile(outputPath, (err, info) => {
    if (err) {
      throw Error(err)
    }
  })
}

export async function processMultipleImages(imageRequestInfo) {
  const { originalImages, edits, compressions, outputFormat } = imageRequestInfo
  let optimizedImages = []

  const { destination, destinationFolder } = await createDestinationFolder()

  const recordKey = destinationFolder

  for (const image of originalImages) {
    // convert image to sharp object
    const sharpImage = await instantiateSharpImage(image.buffer)

    // optimize image
    let modifiedImage = await applyCompression(sharpImage, compressions)
    modifiedImage = await applyEdits(modifiedImage, edits)

    await saveImage(destination, image.name, modifiedImage, outputFormat)
    optimizedImages.push(modifiedImage)
  }

  return recordKey
}