# lake_pend_oreille

### Overview:
Generate the Mean and Median of the wind speed, barometric and air temperature for a given date range of the [Lake Pend Oreille] dataset.

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
[Lake Pend Oreille]: <http://lpo.dt.navy.mil/> 
[processDateRange]: <https://github.com/kingjulian24/lake_pend_oreille/blob/master/stats/processDateRange.js>
[search]: <https://github.com/kingjulian24/lake_pend_oreille/blob/master/stats/search.js>
