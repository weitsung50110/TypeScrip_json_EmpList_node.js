const express = require('express');
const path = require('path');
const app = express();
const port = 4000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/getdata', (req, res) => {
  res.sendFile(path.join(__dirname, 'json/data2.json'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});