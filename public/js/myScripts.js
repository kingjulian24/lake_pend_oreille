$(function(){
    var params,
         sumChartData = [],
        rawChartData = [];
    
    function summary(cb){
        $.ajax({
            url:'/getData/'+params,
            success: function(data){
                cb(null, data);
            },
           error: function(xhr,status,error) {
               cb(error,null);
           }
        }); 
    }
    
    function raw(cb){
        $.ajax({
            url:'/getData/'+params+'/raw',
            success: function(data){
                cb(null, data);
            },
           error: function(xhr,status,error) {
               cb(error,null);
           }
        });
    }
    
    function loadData(p) {
        params = p;
        async.parallel([summary,raw], function(err, data){
            formatData(data);
            loadCharts();
        });
       
    }
    
    function formatData(data) {
        formatSumChartData(data[0]);
        formatRaWChartData(data[1]);
    }
    
    
    
    function formatSumChartData(data) {
        var atMean = ['Mean Air Temperature'];
        var atMedian = ['Median Air Temperature'];
        var wsMean = ['Mean Wind Speed'];
        var wsMedian = ['Median Wind Speed'];
        var bpMean = ['Mean Barometric Pressure'];
        var bpMedian = ['Median Barometric Pressure'];
        
      
        atMean.push(data.air_temp.mean);
        atMedian.push(data.air_temp.median);

        wsMean.push(data.wind_speed.mean); 
        wsMedian.push(data.wind_speed.median);

        bpMean.push(data.bar_press.mean);
        bpMedian.push(data.bar_press.median); 
             
        
        sumChartData.push(atMean,atMedian,bpMean,bpMedian,wsMean,wsMedian);
    }
    
    
    
    function formatRaWChartData(data) {
        var myDates = ['x'];
        var types = {
            air_temp : ['Air Temperature'],
            wind_speed: ['Wind Speed'],
            bar_press: ['Barometric Pressure']
        }
        
        for(type in data) {
            for(var i = 0; i < data[type].length; i++){
               if(type === 'wind_speed'){
                   myDates.push(new Date(data[type][i]._id));
                }
                types[type].push(data[type][i].data);
            }
        }
        
        rawChartData.push(myDates,types.air_temp,types.wind_speed,types.bar_press);
    }
    
    function loadCharts() {
        loadSumChart();
        loadRawChart();
    }
    
    function loadSumChart(){
        var chart = c3.generate({
            bindto: '#sum',
            data: {
                type: 'bar',
              columns: sumChartData,
                groups:[
                    [
                        [
                            'Mean Air Temperature',
                            'Median Air Temperature'
                        ],
                        [
                            'Mean Wind Speed',
                            'Median Wind Speed'
                        ],
                        [
                            'Mean Barometric Pressure',
                            'Median Barometric Pressure'
                        ]
                    ]

                ]
            }

        });
    }
    
    function loadRawChart(){
        var chart = c3.generate({
            bindto: '#raw',
            data: {
                x: 'x',
                type: 'line',
              columns: rawChartData,
            },
            axis: {
              x: {
                type: 'timeseries',
                tick: {
                  format: '%Y-%m-%d %H:%M:%S'
                }
              } // x
            }, // axis
            subchart: {
                show: true
            }// subCharts
        });
    }
    
    
    
    loadData('2014/07-01/07-03');
    
 
    
    

    
    
    
    
    
    
});