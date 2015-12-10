var fs = require('fs');
var loc = './data.txt';
var _ = require('underscore');
var tabsObj = {
    air_temp : {
        data: [],        
    },
    bar_press: {
        data: [],        
    },
    wind_speed: {
        data: [],        
    }
}
    
function msg( msg ){
    console.log(msg);
}

function getAvg(data) {
    return _.reduce(data, function( memo, num ){ return memo + num }, 0 )/data.length;
}

function getRawData( callback ){
    fs.readFile(loc,'utf8', function(err, data){
        if(!err) {
            callback( err, data );
        } else {
            callback( err, data );
        }

    });
}
function roundData(data){
    return Math.round(data*100)/100;
}

function getData( callback ){
   getRawData( function ( err,data ){
       if(err){ console.log('Error Reading File'); return;}
        // separate data by newline then remove header
        data = data.split("\n").splice(1);

        // separte each line by tabs and map it to each tab array
        data.map(function(item){
            var tabs = item.split("\t");
            tabsObj.air_temp.data.push(parseFloat(tabs[1]));
            tabsObj.bar_press.data.push(parseFloat(tabs[2]));
            tabsObj.wind_speed.data.push(parseFloat(tabs[7]));
        });

        for (prop in tabsObj) {
            //gen mean
            var tab = tabsObj[prop];
            var data = tab.data;
            tab.mean = roundData(getAvg(data)); 
            // gen median
            data.sort();
            var medianIndex;
            // if odd
            if( data.length % 2 !== 0 ) {
                medianIndex = Math.round(data.length/2) - 1;
                tab.median = data[medianIndex];
            // if even
            } else {
                medianIndex = Math.round(data.length/2) - 1;
                tab.median = getAvg([
                    data[medianIndex],
                    data[medianIndex + 1]          
                ]);
            }
        }
       
        callback(tabsObj);
    }); 
}

getData(function(data){
    console.log(data);
});


