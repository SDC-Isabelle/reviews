require('dotenv').config();
const {app} = require('./api.js');

// console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log('LISTENING AT PORT', process.env.PORT);
});

