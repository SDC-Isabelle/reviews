const {pool} = require('./db.js')


// pool.query('SELECT * FROM reviews LIMIT 5', (err, res) => {
//   console.log(err, JSON.stringify(res.rows))
//   pool.end()
// })

const getReviews = (productId, page, count, sort) => {
  return pool.connect()
    .then(client => {
      return client.query(`SELECT reviews.review_id,
                            reviews.rating,
                            reviews.summary,
                            reviews.recommend,
                            reviews.response,
                            reviews.body,
                            to_timestamp(reviews.date / 1000) AS date,
                            reviews.reviewer_name,
                            reviews.helpfulness,
                            json_agg(
                              json_build_object(
                                'id',reviews_photos.photo_id,
                                'url',reviews_photos.url)) AS photos
                          FROM reviews
                          JOIN reviews_photos
                          ON reviews.review_id = reviews_photos.review_id
                          WHERE product_id = ${productId}
                          GROUP BY reviews.review_id`)
                   .then(res => {
                      client.release();
                      return res.rows;
                    })
                   .catch(err => {
                    client.release();
                    console.log(err)});
    })
    .catch(err => console.log(err));
  //return ('received from controller');
}

const getMeta = (productId) => {
  return pool.connect()
         .then(client => {
          return client.query(`SELECT json_build_object(
                                      'product_id', ${productId}::varchar(255),
                                      'ratings', json_build_object(
                                        '1', (SELECT count(*)
                                              FROM reviews
                                              WHERE reviews.product_id=${productId}
                                              AND reviews.rating=1)::varchar(255),
                                        '2', (SELECT count(*)
                                              FROM reviews
                                              WHERE reviews.product_id=${productId}
                                              AND reviews.rating=2)::varchar(255),
                                        '3', (SELECT count(*)
                                              FROM reviews
                                              WHERE reviews.product_id=${productId}
                                              AND reviews.rating=3)::varchar(255),
                                        '4', (SELECT count(*)
                                              FROM reviews
                                              WHERE reviews.product_id=${productId}
                                              AND reviews.rating=4)::varchar(255),
                                        '5', (SELECT count(*)
                                              FROM reviews
                                              WHERE reviews.product_id=${productId}
                                              AND reviews.rating=5)::varchar(255)
                                        ),
                                      'recommended', json_build_object(
                                          'false', (SELECT count(*)
                                                    FROM reviews
                                                    WHERE reviews.product_id=${productId}
                                                    AND reviews.recommend=false)::varchar(255),
                                          'true', (SELECT count(*)
                                                   FROM reviews
                                                   WHERE reviews.product_id=${productId}
                                                   AND reviews.recommend=true)::varchar(255)
                                        ),
                                      'characteristics',(
                                        SELECT (
                                          json_object_agg(
                                            name, json_build_object(
                                              'id', id,
                                              'value', avg
                                            )
                                          )
                                        )
                                        FROM (SELECT char.name, char.id, avg(charreview.value)
                                        FROM characteristics AS char
                                        JOIN characteristic_reviews AS charreview
                                        ON char.id = charreview.characteristic_id
                                        WHERE char.product_id = ${productId}
                                        GROUP BY char.id)
                                        as t
                                       )
                                ) AS meta
                                `

                  )
                  .then(data => {
                    client.release();
                    return data.rows;})
                  .catch(err => console.log(err));
         })
         .catch(err => console.log(err));
}

const putHelpful = (review_id) => {
  return pool.connect()
         .then(client => {
            return client.query(`UPDATE reviews
                        SET helpfulness = helpfulness + 1
                        WHERE review_id = ${review_id}`)
         })
         .catch(err => console.log(err))
}

const putReport = (review_id) => {
  return pool.query(`UPDATE reviews
                     SET reported = true
                     WHERE review_id = ${review_id}`)
}

const postReview = (review) =>{
  return pool.query(`INSERT INTO reviews (review_id,product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
  VALUES ((SELECT max(review_id) + 1 FROM reviews), ${review.review_id}, ${review.rating}, ${review.date}, ${review.summary},${review.body}, ${review.recommend}, DEFAULT, ${review.name}, ${review.email}, DEFAULT, DEFAULT)`)
        .then((response) => {
          console.log('SAVED', response);
        })
        .catch(err => console.log(err));
}

module.exports = {
  getReviews,
  getMeta,
  putHelpful,
  putReport,
  postReview,
}