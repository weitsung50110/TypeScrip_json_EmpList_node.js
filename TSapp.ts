import express from 'express';
import path from 'path';

const app = express();
const port = 4000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/getdata', (_req, res) => {
  res.sendFile(path.join(__dirname, 'json/data.json'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});