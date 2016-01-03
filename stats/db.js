var level = require('level');
var subLevel = require('level-sublevel');
var db = subLevel(level('./levelDB',{valueEncoding: 'json'}));

var air_temp = db.sublevel('air_temp');
var bar_press = db.sublevel('bar_press');
var wind_speed = db.sublevel('wind_speed');

module.exports = {
    wind_speed: wind_speed,
    air_temp: air_temp,
    bar_press: bar_press
};