var urls = require('./urls');
var dra = require('date-range-array');

d1 ="2014-01-01";
d2 ="2014-01-02";
//
//var x = urls(new Date(d1), new Date(d2));
//console.log(x);
//console.log(new Date(d1));
//console.log(new Date(d2));
console.log(dra(d1,d2));
var d3 = d1.replace(/-/g,"/");
console.log(d3);