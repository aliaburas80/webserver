var wrapper = require('../lib/wrapper.js')({
  key: "fake-api-key"
});

module.exports = {
  'city-now-exception': function(test) {
      wrapper.city('London').now().then(function(result) {
        test.ok(false);
        test.done();
      }).catch(function(error) {
        test.ok(true);
        test.done();
      });
  }
}
