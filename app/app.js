const express = require('express');
const path = require('path');
const cors = require('cors');
const {getReviews} = require('../database/controllers.js');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '..')));
app.use(express.json());
app.use((req, res, next) => {
  console.log('RECEIVED ', req.method);
  next();
});

app.get('/reviews', (req, res) => {
  console.log(req.query);
  const response = {
    "product": req.query.product_id,
    "page": parseInt(req.query.page) || 1,
    "count": parseInt(req.query.count) || 5
  };
  const product_id = parseInt(req.query.product_id);

  getReviews(product_id, response.page, response.count, response.sort)
  .then(data => {
    //console.log('DATA ', data);
    response.results = data;
    response.results.forEach((element) => {
      element['photos'] = element['json_agg'];
      element['date'] = element['to_timestamp'];
      delete element['json_agg'];
      delete element['to_timestamp'];
    })
    console.log(response.results);
    delete response.results['json_agg'];
    res.status(200).send(response);
  })
  .catch(err => console.log(err));

})

app.get('/reviews/meta', (req, res) => {
  console.log(req.query);
  const productId = parseInt(req.query.product_id);
  res.status(200).send('received');
})

app.post('/reviews', (req, res) => {
  console.log(req.body);
  const productId = parseInt(req.body.product_id);
  res.status(201).send('received');
})

app.put('/reviews/:review_id/helpful', (req, res) => {
  const reviewId = req.params.review_id;
  console.log(reviewId)
  res.status(204).send('received');
})

app.put('/reviews/:review_id/reported', (req, res) => {
  const reviewId = req.params.review_id;
  console.log(reviewId)
  res.status(204).send('received');
})

module.exports = {
  app
}