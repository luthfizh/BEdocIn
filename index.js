import process from 'process';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import getenv from './src/helper/getenv.js';

const app = express();

const PORT = getenv('PORT');
const MONGO_URI = getenv('MONGO_URI');

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to DocIn Database!'))
  .catch((err) => {
    console.error(`Can't connect to DocIn Database!`);
    console.error(err);
    process.exit(1);
  });

app.use(cors());

app.get('/', (req, res) => {
  res.send('Express');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));