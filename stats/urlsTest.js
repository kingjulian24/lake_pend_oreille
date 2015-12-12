var _ = require('underscore');
var data = require('./data');
var x = {
        air_temp: [],
        bar_press: [],
        wind_speed: []
    };

for(var i = 0; i< data.length; i++) {
  
var obj = data[i];
   for(p in obj) {
       for(var i = 0; i<obj[p].length; i++){
           x[p].push( _.compact(obj[p][i].trim().split(" "))[2]);
       }
   } 
}

var last = _.last(x.at);
for(p in x) {
    x[p] = x[p].slice(0, -1);
}

var f = [1,2,4,5,6,4];

console.log(x);