import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs'

import optimize from './optimize.js';
import download from './download.js';
import _delete from './delete.js';

import cron from 'node-cron'
// cron.schedule('* * * * *', async() => {
//   console.log('running a task every minute')
//   console.log(`${new Date().getHours()}:${new Date().getMinutes()}`)
//   // await _delete()
// })
cron.schedule('0 * * * *', async() => {
  console.log(`running a task every hour [${new Date().getHours()}:${new Date().getMinutes()}]`)
  await _delete()
})

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions))

// parses application/json
app.use(express.json())
// parses application/xwww-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// parses multipart/form-data
// app.use(upload.array())
app.use(express.static('./uploads'))

app.get('/ready', (req, res) => {
  return res.status(200).json(`I'm ready`);
})

// optimize images with no resizing
app.post('/optimize', upload.array('files'), async(req, res) => {
  const recordKey = await optimize(req.files, req.query);
  return res.status(200).json({ recordKey });
})

app.get('/download', async(req, res) => {
  const { recordKey } = req.query;
  // if (!key) return res.status(500).json('Please specify key')

  await download(res, recordKey);
})

app.listen(8000, () => {
  console.log(`Magic is happening at port 8000!`);
})