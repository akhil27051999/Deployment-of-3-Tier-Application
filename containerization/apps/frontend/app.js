const express = require('express');
const app = express();
const PORT = 3000; # this is the const port 

app.get('/', (req, res) => {
  res.send('Hello from Frontend!');
});

app.listen(PORT, () => {
  console.log(`Frontend app listening at http://localhost:${PORT}`);
});

