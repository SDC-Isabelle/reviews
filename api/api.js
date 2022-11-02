const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));
app.use((req, res, next) => {
  console.log('RECEIVED ', req.method, req.url);
  next();
});

// app.get()


module.exports = {
  app
}