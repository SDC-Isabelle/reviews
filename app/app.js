const express = require('express');
const path = require('path');
const cors = require('cors');
const {getReviews, getMeta, putHelpful, putReport, postReview} = require('../database/controllers.js');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '..')));
app.use(express.json());
app.use((req, res, next) => {
  console.log('API MIDDLEWARE RECEIVED ', req.method);
  next();
});

app.get('/loaderio-da050fb0a100bf1be311b3c8c6e748cc', (req, res) => res.send('/loaderio-da050fb0a100bf1be311b3c8c6e748cc'))


app.get('/reviews', (req, res) => {
  //console.log(req.query);
  const response = {
    "product": req.query.product_id,
    "page": parseInt(req.query.page) || 1,
    "count": parseInt(req.query.count) || 5
  };

  console.log('GETTING REVIEWS FROM DB');
  const offset = (response.page - 1) * response.count;
  // sort "NEWEST, HELPFUL AND RELEVANT";
  let sort = null;
  if (req.query.sort === 'newest') {
    sort = 'date';
  } else if (req.query.sort == 'helpful') {
    sort = 'helpfulness';
  } else {
    sort = 'date';
  }
  getReviews(parseInt(req.query.product_id), offset, response.count, sort)
  .then(data => {
    //console.log('DATA ', data);
    response.results = data;
    //change data keys and values to match original api data
    // response.results.forEach((element) => {
    //   if (element['response'] === 'null'){
    //     element['response'] = null;
    //   }
    // })
   // console.log(response.results);
    //delete response.results['json_agg'];
    res.status(200).send(response);
    console.log('SENT RESPONSE TO CLIENT')
  })
  .catch(err => {
    console.log(err)
    res.send('FAILED');
  })

})

app.get('/reviews/meta', (req, res) => {
 // console.log(req.query);
 console.log('GETTING META FROM DB');
  getMeta(parseInt(req.query.product_id))
  .then(data => {
    //console.log(data);
    res.status(200).send(data[0].meta);
    console.log('SENT RESPONSE TO CLIENT');
  })

})

app.post('/reviews', (req, res) => {
  if (!req.body.product_id || !req.body.rating || ! req.body.name || !req.body.characteristics) {
    res.status(400).send('Missing product_id or rating or reviewer name or characteristics')
  } else {
    const review = req.body;
    review.date = Date.now();
    console.log(review);
    postReview(review)
    .then((db) => res.status(201).send(db))
    .catch(err => console.log(err));
  }

})

app.put('/reviews/:review_id/helpful', (req, res) => {
  putHelpful(req.params.review_id)
  .then(() => {
    res.sendStatus(204);
  })
  .catch(err => console.log(err))
})

app.put('/reviews/:review_id/reported', (req, res) => {
  putReport(req.params.review_id)
  .then(() => {
    res.sendStatus(204)
  })
  .catch(err => console.log(err));
})

module.exports = {
  app
}