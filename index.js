import process from 'process';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import usersRouter from './src/routes/usersRoute.js';
import doctorsRouter from './src/routes/doctorsRoute.js';
import appointmentsRouter from './src/routes/appointmentsRoute.js';

import getenv from './src/helper/getenv.js';

const app = express();

const PORT = getenv('PORT');
const MONGO_URI = getenv('MONGO_URI');

var corsOptions = {
  origin: ["http://localhost:5000", "http://localhost:3000", "https://fe-doc-in.app"],
  credentials: true,
  // exposedHeaders: ["set-cookie"]
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to DocIn Database!'))
  .catch((err) => {
    console.error(`Can't connect to DocIn Database!`);
    console.error(err);
    process.exit(1);
  });

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Express');
});

app.use('/users', usersRouter);
app.use('/doctors', doctorsRouter);
app.use('/appointments', appointmentsRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));