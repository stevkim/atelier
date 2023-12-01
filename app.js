const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

const URL = process.env.API_URL;
const options = { headers: { Authorization: process.env.GIT_TOKEN } };

app.route('/*')
  .get((req, res) => {
    axios.get(`${URL}${req.url}`, options)
      .then((results) => {
        res.status(200).json(results.data);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  })
  .post((req, res) => {
    axios.post(`${URL}${req.url}`, req.body, options)
      .then(() => {
        res.status(201).json({ message: 'Successfully posted' });
      })
      .catch(() => {
        res.sendStatus(404);
      });
  })
  .put((req, res) => {
    axios.put(`${URL}${req.url}`, null, options)
      .then(() => {
        res.status(200).json({ message: 'Successfully PUT request' });
      })
      .catch(() => {
        res.sendStatus(404);
      });
  });

app.listen(3000, () => {
  console.log('Listening on port:3000');
});
