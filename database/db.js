const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});
// const {Sequelize} = require('sequelize');

// const sequelize = new Sequelize('sdc', 'postgres', null, {
//   host: 'localhost',
//   dialect: 'postgres'
// });

// sequelize.authenticate().then(() => console.log('yes')).catch(err => console.log(err));


const {Pool, Client} = require('pg');

const config = {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

const pool = new Pool(config)

module.exports = {
  pool,
}
//console.log(process.env.PORT, credentials);

// pool.query('SELECT * FROM reviews LIMIT 5', (err, res) => {
//   console.log(err, JSON.stringify(res.rows))
//   pool.end()
// })
