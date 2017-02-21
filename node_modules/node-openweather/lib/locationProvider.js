var TypeProvider = require('./typeProvider.js');

var LocationProvider = function(internalConfig, externalConfig) {
    return {
      city: function(city, country) {

        externalConfig.params = {
          city: city,
          country: country
        };

        var type = new TypeProvider(internalConfig, externalConfig);
        return type;
      },

      coords: function(lat, lng) {
        externalConfig.params = {
          lat: lat,
          lng: lng
        };

        var type = new TypeProvider(internalConfig, externalConfig);
        return type;
      },

      zip: function(zip, country) {
        externalConfig.params = {
          zip: zip,
          country: country
        };

        var type = new TypeProvider(internalConfig, externalConfig);
        return type;
      },

      id: function(id) {
        externalConfig.params = {
          id: id
        };

        var type = new TypeProvider(internalConfig, externalConfig);
        return type;
      }
    }
}

module.exports = LocationProvider;
