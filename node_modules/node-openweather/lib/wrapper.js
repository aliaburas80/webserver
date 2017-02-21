var LocationProvider = require('./locationProvider.js');

var internalConfig = require('../config/api.config.js');

module.exports = function(externalConfig) {
  var location = new LocationProvider(internalConfig, externalConfig);
  return location;
}
