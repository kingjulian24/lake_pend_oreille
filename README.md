# lake_pend_oreille

### Overview:
Generate the Mean and Median of the wind speed, barometric and air temperature for a given date range of the Lake Pend Oreille dataset.

*  ~~Get Date Range via url~~ [search]
*  ~~Formate Date Range~~ [processDateRange]
*  ~~Make sure the date range is less than 8 days~~ [processDateRange]
*  ~~Choose database~~ [mongodb]
*  ~~Configure DB~~
*  ~~Save Test Data to DB~~ 
*  ~~Check [LPO] for date range~~ [search]
*  ~~Check to see if date range exist in database~~ [search]
*  ~~Else retrieve data from~~ [LPO][search]
* ~~Retrieve Data~~ [search]
* ~~Process Data~~
* ~~Return Results~~
* ~~Add endpoint for raw data~~ 
* Need to break up [search]
 
### API

Get Summary
```
/getData/:year/:start/:end
:year = YYYY
:start = MM-DD
:end = MM-DD
```
Get Raw Data
```
/getData/:year/:start/:end/raw
:year = YYYY
:start = MM-DD
:end = MM-DD
```



### Installation

Install  [Mongodb]

### DB Setup
```
DB Name: DMDB
```

Install dependencies 
```sh
$ npm install 
```
## Run Tests
```sh
$ mocha test
```


[MongoDB]: <https://www.mongodb.org/downloads#productiong>
[LPO]: <http://lpo.dt.navy.mil/>
[processDateRange]: <https://github.com/kingjulian24/lake_pend_oreille/blob/master/stats/processDateRange.js>
[search]: <https://github.com/kingjulian24/lake_pend_oreille/blob/master/stats/search.js>
