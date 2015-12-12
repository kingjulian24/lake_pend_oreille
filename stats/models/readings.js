var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.55.55/DMDB');
var Schema = mongoose.Schema;

readingsSchema = new Schema({
    _id: Number,
    date: Number,
    data: Number
});
var wsm = mongoose.model('wind_speed', readingsSchema);
var atm = mongoose.model('air_temp', readingsSchema);
var bpm = mongoose.model('bar_press', readingsSchema);

module.exports = {
    wsm: wsm,
    atm: atm,
    bpm: bpm,
    db: mongoose
};