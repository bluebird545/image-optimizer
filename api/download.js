import path from 'path'
import fs from 'fs'
import archiver from 'archiver';

export default async(res, recordKey) => {
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