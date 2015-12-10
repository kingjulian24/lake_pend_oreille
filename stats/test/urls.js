var options = {
    bar_press:
       ['./data.txt', './data2.txt']
    ,
    air_temp: 
        ['./data.txt', './data2.txt'],
    wind_speed: 
        ['./data.txt', './data2.txt'], 
};

exports.getUrls = function() {
    return options;
};

