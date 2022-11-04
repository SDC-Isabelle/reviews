const {pool} = require('./db.js')


// pool.query('SELECT * FROM reviews LIMIT 5', (err, res) => {
//   console.log(err, JSON.stringify(res.rows))
//   pool.end()
// })

const getReviews = (productId, page, count, sort) => {
  return pool.query(`SELECT reviews.review_id,
                            reviews.rating,
                            reviews.summary,
                            reviews.recommend,
                            reviews.response,
                            reviews.body,
                            to_timestamp(reviews.date / 1000),
                            reviews.reviewer_name,
                            reviews.helpfulness,
                            json_agg(
                              json_build_object(
                                'id',reviews_photos.photo_id,
                                'url',reviews_photos.url))
                      FROM reviews
                      JOIN reviews_photos
                      ON reviews.review_id = reviews_photos.review_id
                      WHERE product_id = ${productId}
                      GROUP BY reviews.review_id`)
         .then(res => {
          return res.rows
        })
         .catch(err => console.log(err));

  //return ('received from controller');
}

const getMeta = (productId)

module.exports = {
  getReviews,
  getMeta,
}