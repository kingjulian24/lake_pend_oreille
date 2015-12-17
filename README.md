# lake_pend_oreille

### Overview:
[Nodejs] API that exposes the statistical data of the [Lake Pend Oreille] dataset front end app that consumes and visualize the data using [C3].

### API

Get Summary
```
/getData/:year/:start/:end
:year = YYYY
:start = MM-DD
:end = MM-DD
```
![alt tag](https://raw.githubusercontent.com/kingjulian24/lake_pend_oreille/master/repo_img/summary.png "Summary api call")
Get Raw Data
```
/getData/:year/:start/:end/raw
:year = YYYY
:start = MM-DD
:end = MM-DD
```
![alt tag](https://raw.githubusercontent.com/kingjulian24/lake_pend_oreille/master/repo_img/raw.png "Raw api call")

Front End
```
/
```
![alt tag](https://raw.githubusercontent.com/kingjulian24/lake_pend_oreille/master/repo_img/c3_chart.png "Front end")

### Installation

Install  [Mongodb]

### DB Setup
```
DB Name: DMDB
```

Install dependencies 
```sh
$ npm install 
$ bower install from /public
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
[C3]: <http://c3js.org/>
[Nodejs]: <https://nodejs.org>
