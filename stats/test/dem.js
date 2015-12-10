var fs = require('fs');


var _ = require('underscore');
var dataObj = {
    air_temp : {
        data: [],        
    },
    bar_press: {
        data:[],        
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

function requestData (prop, options, callback) {
    for(var i = 0; i < options[prop].length; i++ ){
           //msg(prop);
           fs.readFile(options[prop][i],'utf8', function(err, data){
               msg(prop);
               if(err){ console.log("Error retrieving data."); return};
                callback( prop, data );
            }); 
        } 
}

function getRawData( options, callback ){
    for( prop in options ){
       requestData( prop, options, callback );
    }   
}

function roundData(data){
    return Math.round(data*100)/100;
}

function getData( options, callback ){
   getRawData( options, function ( prop , data ){
       var rows;
       // separate data by newline 
       data = data.split("\n");
       // split and map data
       data.map(function(item){
           rows = item.split(" ");
           
           dataObj[prop].data.push({
               date: rows[0],
               time: rows[1],
               readings: rows[3]
           });
       });
       
        callback(data);
    }); 
}
//msg(typeof loc[0]);
var x = 0;

getData(options, function(data){
    x++;
    if(x == options.air_temp.length * 3)
    console.log(dataObj);
});


