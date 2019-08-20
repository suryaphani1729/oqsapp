let mongoose = require('mongoose');


class Database {
  constructor() {
    this._connect()
  }
  
_connect() {

     mongoose.connect('mongodb+srv://surya123:surya123@contactkeeper-fjc9p.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true})
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error(err)
       })
  }
}

module.exports = new Database()