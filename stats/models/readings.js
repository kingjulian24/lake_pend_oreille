var mongoose = require('mongoose');
mongoose.connect('mongodb://lpouser:lpopw@ds037185.mongolab.com:37185/dmdb');
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
