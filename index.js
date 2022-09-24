import express from 'express';
import cors from 'cors';

const app = express();

const PORT = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Express');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));