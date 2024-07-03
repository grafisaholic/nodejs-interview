const db = require('./config/db.json')

const express = require('express');
const mongoose = require('mongoose')
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let authMongoDB = db.password != '' ? db.username +':'+ db.password + '@' : '';
mongoose.connect(`mongodb://${authMongoDB}${db.host}:${db.port}/${db.db}`,{

}).then((connected) => {
  console.log('[!] MONGODB DATABASE CONNECTED ON HOST : '+db.host);
  
  app.use('', require('./routes'))
  app.listen(8000, () => console.log('Application running on port 8000'))
}).catch((err) => {
  console.log(err);
  process.exit(1)
});

