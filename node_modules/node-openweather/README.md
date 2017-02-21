# overburn/node-openweather

[![Build Status](https://travis-ci.org/overburn/node-openweather.svg?branch=master)](https://travis-ci.org/overburn/node-openweather)
[![npm version](https://badge.fury.io/js/node-openweather.svg)](https://badge.fury.io/js/node-openweather)

## Installation

Just install the package using npm
```bash
npm install node-openweather
```

## Usage
** Work in progress - more endpoints will be covered soon **

```javascript
var weather = require('node-openweather')({
  key: "your-openweathermap-api-key",
  accuracy: "like",
  unit: "metric",
  language: "en"
});

weather.city('London').now().then(function(res) {
  //success logic
}).catch(function(err) {
  //error handling
});
```

# Location selectors
```javascript
city(city_name, [country])
coords(lat, lng)
zip(zip_code, [country])
id(city_id)
```

#Time selectors
```javascript
now()
forecast(5) or forecast(16)
history()
```
