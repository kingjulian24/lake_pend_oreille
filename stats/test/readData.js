var fs = require('fs');
var urls = require('./urls.js').getUrls();
var count = 0;
var numberOfItems;
var dataObj = {
    air_temp : { data: [] },
    bar_press: { data:[] },
    wind_speed: { data: [] }
};

function readData(urls, currentProp, callback ){
    var urlsArray = urls[currentProp];
    for(var i = 0; i < urlsArray.length; i++ ){
        fs.readFile(urlsArray[i], 'utf8', function( err, data ){
            if(err){ console.log("Error reading data."); return; }
            callback(data);
        });
    }
}

function getProcessingData( callback ){
  for( prop in urls ){
    readData( urls, prop, function( data ){
        callback(data);
    });
  }  
}

function getData( callback ) {
   getProcessingData(function(data){
        count++;
        numberOfItems = urls.wind_speed.length * 3
        if(count === numberOfItems ) {
            callback(count);
        }
        
    }); 
}

getData(function(data){
    console.log(data);
});



