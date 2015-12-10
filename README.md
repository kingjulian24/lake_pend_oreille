# lake_pend_oreille
### Installation

Need MongoDB

Use dbTest.js to generate test data
```sh
$ node stats/dbTest.js
```

Install dependencies from /root & /stats
```sh
$ npm install 
```

## Notes
Overview:
Generate the Mean and Median of the wind speed, barometric and air temperature for a given date range of the Lake Pend Oreille dataset.

1. Get Date Range - Done
1'.Formate Date Range - Done 
2. Make sure the date range is less than 8 days - Done
2'. Return error - Done
- Make database - Done
- Configure DB - Done
- Save Test Data to DB - Done
3. Check to see if date range exist in database Done
- http://lpo.dt.navy.mil/
4. Retrieve Data
5. Process Data
6. Return Results

1. Get Date Range
'/getData/:year/:start/:end'
:year = yyyy
:start = mm_dd
:end = mm_dd

2. Make sure the date range is less than 8 days


DB Setup

ID: date + time in milliseconds

date: date in milliseconds

data: reading
