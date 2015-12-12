# lake_pend_oreille

### Overview:
Generate the Mean and Median of the wind speed, barometric and air temperature for a given date range of the Lake Pend Oreille dataset.

*  ~~Get Date Range via url~~ [urls]
*  ~~Formate Date Range~~ [processDateRange]
*  ~~Make sure the date range is less than 8 days~~ [processDateRange]
*  ~~Choose database~~ [mongodb]
*  ~~Configure DB~~
*  ~~Save Test Data to DB~~ [dbTest]
*  Check [LPO] for date range
*  Check to see if date range exist in database [search]
*  Else retrieve data from [LPO]
* Retrieve Data
* Process Data
* Return Results



### Installation

Install  [Mongodb]

### DB Setup
```
ID: date + time in milliseconds
date: date in milliseconds
data: reading
```

## Get Date Range via URL
```
/getData/:year/:start/:end
:year = YYYY
:start = MM-DD
:end = MM-DD
```

Generate test data: 
```sh
$ node stats/dbTest.js
```
note: edit file as needed.

Install dependencies from /root & /stats
```sh
$ npm install 
```
## Run Tests
```sh
$ sh moch test
```


[MongoDB]: <https://www.mongodb.org/downloads#productiong>
[LPO]: <http://lpo.dt.navy.mil/>
[urls]: <https://github.com/kingjulian24/lake_pend_oreille/blob/master/stats/urls.js>
[processDateRange]: <https://github.com/kingjulian24/lake_pend_oreille/blob/master/stats/processDateRange.js>
[dbTest]: <https://github.com/kingjulian24/lake_pend_oreille/blob/master/stats/dbTest.js>

[search]: <https://github.com/kingjulian24/lake_pend_oreille/blob/master/stats/search.js>
