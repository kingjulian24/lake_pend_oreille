$(function(){
    
    var sumChartData = [],
        rawChartData = [],
        errMsg,
        startDate,
        endDate;
    var $loadIndicator = $('#loading');
    var $errIndicator = $('#error');
    
    // summary dat ajax request
    function summary(cb){
        $.ajax({
            url:'/getData/'+startDate.year+'/'+startDate.md+'/'+endDate.md,
            success: function(data){
                $('#error').addClass('hide');
                cb(null, data);
            },
           error: function(xhr,status,error) {
               cb(error,null);
           }
        }); 
    }
    
    // raw data ajax request
    function raw(cb){
        $.ajax({
            url:'/getData/'+startDate.year+'/'+startDate.md+'/'+endDate.md+'/raw',
            success: function(data){
                $('#error').addClass('hide');
                cb(null, data);
            },
           error: function(xhr,status,error) {
               cb(error,null);
           }
        }); 
    }
    
    // call ajax requests
    function loadData() {
        async.series([summary,raw], function(err, data){
            if(!data[0].error) {
                formatData(data);
                loadCharts();
                showIndicator(false, $loadIndicator);
                showIndicator(false, $errIndicator);
            } else if(data[0].error) {
                errMsg = data[0].error;
                $errIndicator.html(errMsg);
                showIndicator(true, $errIndicator);
            } else {
                console.log('There was an error: ', err);
            }
            
        });
       
    }
    
    // format ajax data
    function formatData(data) {
        formatSumChartData(data[0]);
        formatRaWChartData(data[1]);
    }
    
    // format summary chart data
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
             
        sumChartData = [];
        sumChartData.push(atMean,atMedian,bpMean,bpMedian,wsMean,wsMedian);
    }
    
    // format raw chart data
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
                   myDates.push(new Date( Number(data[type][i].key) ));
                }
                types[type].push(data[type][i].value.data);
            }
        }
        rawChartData = [];
        rawChartData.push(myDates,types.air_temp,types.wind_speed,types.bar_press);
    }
    
    // load all charts
    function loadCharts() {
        loadSumChart();
        loadRawChart();
    }
    
    // load summary chart
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
    
    // load raw chart
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
                  format: '%m-%d-%Y %H:%M:%S'
                }
              } // x
            }, // axis
            subchart: {
                show: true
            }// subCharts
        });
    }
    
    // format dates for ajax requests
    function formatDate(date) {
      var someday = new Date(date);
      var month = someday.getUTCMonth() + 1;
      var day = someday.getUTCDate();
      var year = someday.getUTCFullYear();

      if (month <= 9) { month = '0' + month; }
      if (day <= 9) { day = '0' + day; }

      return {
          year: ''+year,
          md:''+month+'-'+day
      };
    }
    
    function showIndicator(show,type) {
        if(show){
            type.removeClass('hide');
        } else {
            type.addClass('hide');
        }
    }

    
 // Events -------
    $('form').on('submit',function(e){
        startDate = formatDate(document.rangeform.from.value);
        endDate = formatDate(document.rangeform.to.value);
        loadData();
        showIndicator(true,$loadIndicator);
        console.log("STARTDATE:", startDate);
        console.log("ENDDATE:", endDate);
         
  
        e.preventDefault();
    });
    
});