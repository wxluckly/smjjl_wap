angular.module('starter.services', [])

.factory('Settings', function() {
  // Might use a resource here that returns a JSON array
  return {
    api_domain: 'http://192.168.2.218'
  };
});
