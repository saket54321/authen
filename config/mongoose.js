// 127.0.0.1 is used in place of localhost because it give sometime error
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

 /* const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1/codeil');
const db=mongoose.connection;
db.on('error',console.error.bind(console,"error handling"));
db.once('open',function(){
    console.log('connected to database::mongodb');
});
module.exports=db;*/
/*const mongoose = require('mongoose');

function connectToMongoDB() {
  return mongoose.connect('mongodb://127.0.0.1/mydatabase')
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB', error);
    });
}

module.exports = connectToMongoDB;
*/