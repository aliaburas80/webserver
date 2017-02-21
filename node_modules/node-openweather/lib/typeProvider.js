var request = require("superagent");
var Promise = require('bluebird');
var TypeProvider = function(internalConfig, externalConfig) {
  var composeUrl = function(requestUrl) {
    if( typeof externalConfig.params.lat != 'undefined' &&
        typeof externalConfig.params.lng != 'undefined') {
          requestUrl += "lat="+externalConfig.params.lat+"&lon="+externalConfig.params.lng;
        }

    if(typeof externalConfig.params.id != 'undefined') {
      requestUrl += "id="+externalConfig.params.id;
    }

    if(typeof externalConfig.params.zip != 'undefined') {
      requestUrl += "q="+externalConfig.params.zip;
    }

    if(typeof externalConfig.params.city != 'undefined') {
      requestUrl += "q="+externalConfig.params.city;
    }

    if(typeof externalConfig.params.country != 'undefined') {
      requestUrl += ","+externalConfig.params.country;
    }

    if(typeof externalConfig.accuracy != 'undefined') {
      requestUrl += "&accuracy="+externalConfig.accuracy;
    }

    if(typeof externalConfig.units != 'undefined') {
      requestUrl += "&units="+externalConfig.units;
    }

    if(typeof externalConfig.language != 'undefined') {
      requestUrl += "&lang="+externalConfig.language;
    }

    requestUrl += "&appid="+externalConfig.key;

    console.log(requestUrl);

    return requestUrl
  }

  var perform = function(requestSegment, resolve, reject) {
    var requestUrl =   composeUrl(
      internalConfig.base +
      requestSegment);

    request.get( requestUrl )
      .end(function(err, res) {
          if(err) {
            reject(err.message);
          } else {
            resolve(res.body);
          }
      });
  }

  return {
    now: function() {
      return new Promise(function(resolve, reject) {
        perform(internalConfig.current, resolve, reject);
      });
    },
    forecast: function(value) {
      return new Promise(function(resolve, reject) {
          if(value == 5) {
            perform(internalConfig.forecast5, resolve, reject);
          }
          else if(value == 16) {
            perform(internalConfig.forecast16, resolve, reject);
          }
      });
    },
    history: function() {
      return new Promise(function(resolve, reject) {
        perform(internalConfig.historical, resolve, reject);
      });
    }
  }
}

module.exports = TypeProvider;
