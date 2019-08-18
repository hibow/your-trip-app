const mongoose = require('mongoose');

const url = 'mongodb://localhost';// localhost';
const mongoDBURI = process.env.MONGOLAB_URI || url;
mongoose.connect(mongoDBURI,
  {
    dbName: 'trip',
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }).then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err));

const db = mongoose.connection;

module.exports = db;