const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const gifts = require("./data/gifts.json");
const app = express();
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API');
});
app.post('/data', (req, res) => {
    const receivedData = req.body;
    res.json({ message: 'Data received successfully', data: receivedData });
});
app.get("/api/gifts", (req, res) => {
  res.status(200).json({
    count: gifts.length,
    data: gifts
  });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});