var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.55.55/DMDB');
var Schema = mongoose.Schema;

readingsSchema = new Schema({
    _id: Number,
    date: Number,
    data: Number
});

module.exports = {
    wind_speed: mongoose.model('wind_speed', readingsSchema),
    air_temp: mongoose.model('air_temp', readingsSchema),
    bar_press: mongoose.model('bar_press', readingsSchema),
    db: mongoose
};