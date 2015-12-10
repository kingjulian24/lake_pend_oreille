var urls = require('./urls');

d1 ="2014/01/01";
d2 ="2014/01/02";

var x = urls(new Date(d1), new Date(d2));
console.log(x);
console.log(new Date(d1).getTime());