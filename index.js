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

// const allowCors = fn => async (req, res) => {
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   // res.setHeader('Access-Control-Allow-Origin', '*')
//   // another common pattern
//   res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   )
//   if (req.method === 'OPTIONS') {
//     res.status(200).end()
//     return
//   }
//   return await fn(req, res)
// }

// const handler = (req, res) => {
//   const d = new Date()
//   res.end(d.toString())
// }

// module.exports = allowCors(handler)
// module.exports = (req, res) => {
//   //set header first to allow request or origin domain (value can be different)
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');

// //---- other code

// //Preflight CORS handler
//   if(req.method === 'OPTIONS') {
//       return res.status(200).json(({
//           body: "OK"
//       }))
//   }

// }

// exports.handler = function(event, context, callback) {

//   //---- other code
  
//    //Allow CORS in header
//   const headers = {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Headers': 'Content-Type',
//     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
//   };
  
//      if (event.httpMethod === 'OPTIONS') {
//         // To enable CORS
//         return {
//          statusCode: 200, 
//          headers,
//          body: 'success'
//        };
//    }
//   }

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to DocIn Database!'))
  .catch((err) => {
    console.error(`Can't connect to DocIn Database!`);
    console.error(err);
    process.exit(1);
  });

app.use(cors({
  origin: "https://fe-doc-in.vercel.app",
}));
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