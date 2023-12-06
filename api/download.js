import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
import archiver from 'archiver';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const workingDirectory = __dirname;

// // const imagePath = path.join('public', imagePaths.src);
// // const outputPath = path.join('public', imagePaths.dest);
// const outputPath = 'uploads'
// const downloadPath = 'download'
// const imageDirectory = path.join(workingDirectory, outputPath);

export default async(res, recordKey) => {
  console.log(`Getting files from ${recordKey}`)
  // const destinationPath = path.join(workingDirectory, outputPath, destinationFolder)
  // const filePath = fs.createReadStream(destinationPath)
  // console.log(`filePath: `, filePath)

  const directoryPath = path.join('./uploads', recordKey)

  // start of using archiver
  const zip = archiver('zip')

  zip.on('close', function() {
    console.log(zip.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });
  zip.on('error', e => console.log('zip error: ', e.message));
  zip.on('entry', entry => console.log('appended ', entry.name));

  // check to see if directory exists
  fs.access(directoryPath, (err) => {
    if (err) return res.status(400).json('Directory with this record key does not exist')
  })

  // append directory contents to archiver root
  zip.directory(directoryPath, false)

  res.attachment('output.zip')

  zip.pipe(res)

  zip.finalize()
}