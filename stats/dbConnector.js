var cradle = require('cradle'),
    db = require('./appConfig').db;

 //create db connection
module.exports = new(cradle.Connection)('http://127.0.0.1', 5984, {
  auth: {username: db.username, password: db.password}
}).database(db.name);

//module.exports = {
//    value: "hello"
//}