import fs from 'fs'

const DIR_TO_EMPTY = './uploads/'

export default async function(imageRequestInfo) {
  fs.readdir(DIR_TO_EMPTY, (err, files) => {
    if (err) console.err(err)

    if (files.length > 0) {
      for (const file of files) {
        fs.rmdir(`${DIR_TO_EMPTY}${file}`, { recursive: true }, (err) => {
          if (err) console.err(err)
          else console.log("Recursive: Directories Deleted!")
        })
      }
    }

  })
}