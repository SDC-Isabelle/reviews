const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

const {Pool, Client} = require('pg');

const config = {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD,
  max: 100,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 0,
};

const pool = new Pool(config)
console.log("PG POOL CREATED")
module.exports = {
  pool,
}
//console.log(process.env.PORT, credentials);

// pool.query('SELECT * FROM reviews LIMIT 5', (err, res) => {
//   console.log(err, JSON.stringify(res.rows))
//   pool.end()
// })
