angular.module('ipApp', [])

  .controller('mainController', function ($scope, $http) {

    var ip = this;
    var config = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8;'
      }
    }

    ip.credentialData = {};

    ip.addCredential = function () {

      var data = {
        title: ip.credentialData.title,
        name: ip.credentialData.name,
        major: ip.credentialData.major,
        start: ip.credentialData.start,
        end: ip.credentialData.end,
      };

      return $http.post('http://localhost:8888/', data, config)
        .success(ip.credentialData = {})
    };
  });