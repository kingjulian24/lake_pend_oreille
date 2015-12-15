exports.processDBData = function(data, raw) {
    var pd = {};
    var rawData = {
        wind_speed: [],
        air_temp: [],
        bar_press: []
    }
    var rawData2 = {
        wind_speed: [],
        air_temp: [],
        bar_press: []
    }
    for(prop in data){
        for(var i = 0; i < data[prop].length; i++ ){
            rawData[prop] = rawData[prop].concat(data[prop][i]);
        }
    }
    
    for (prop in rawData) {
        for(var i = 0; i < rawData[prop].length; i++ ){
            rawData2[prop].push(rawData[prop][i].data);
        }
        pd[prop] = getStats(rawData2[prop]);
    }
    
    if(raw){ return rawData;}
    
    return pd;
}

function getStats(readings) {
    // Mean
    var mean = (readings.reduce(function(memo, num){
        return memo + num; 
    })/readings.length).toFixed(2);

    // Median
    readings.sort();
    var isOdd = readings.length % 2 === 1 ? true : false;
    var median;
    if(isOdd){
        var index = Math.floor([readings.length/2]);
        median = readings[index];
    } else {
        var index1 = readings.length/2;
        var index2 = index1 - 1;
        median = (readings[index1] + readings[index2]) / 2;
    } 

    return {
        mean: parseFloat(mean),
        median: median
     };
}

exports.prepDBQuery = function(dates) {
    var collections = ['air_temp', 'bar_press', 'wind_speed'];
    var query = {
        wind_speed:[],
        bar_press:[],
        air_temp:[]
    };
    for(var i = 0; i < dates.length; i++) {
       for(var j = 0; j < collections.length; j++) {
           query[collections[j]].push({
               query: {date: dates[i]},
               type: collections[j]
           });
       }
    }
    
    return query;
}