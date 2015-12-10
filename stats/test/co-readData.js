var fs = require('co-fs');
var co = require('co');
var data;


co(function* (){

   data += yield fs.readFile('./data.txt', 'utf8');
   console.log(data);
});




