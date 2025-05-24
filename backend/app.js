const express = require('express');
const app = express();
const PORT = 4000;

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Backend API!' });
});

app.listen(PORT, () => {
  console.log(`Backend app listening at http://localhost:${PORT}`);
});
