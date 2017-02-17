var angular = require('angular');
var myapp = angular.module('myApp', []);

myapp.factory('DataService', function ($http) {
  var service = {};
  service.query = function () {
    return $http.get('data/data.json');
  }
  return service;
});

myapp.controller("MainCtrl", function ($scope, DataService) {
  DataService.query().then(function (response) {
    var data = response.data;
    var dataArray = new Array(data.sizeY * data.sizeX);
    for (var k = 0; k < dataArray.length; k++) {
      dataArray[k] = {
        across: 0,
        down: 0,
        empty: true
      };
    }

    data.across.forEach(function (info) {
      var xIndex = info.x - 1;
      var yIndex = info.y - 1;
      var initialIndex = yIndex * data.sizeX + xIndex;
      dataArray[initialIndex].number = info.number;
      for (var i = 0; i < info.length; i++) {
        var cell = dataArray[initialIndex + i];
        cell.empty = false;
        cell.across = info.number;
      }
    });
    
    data.down.forEach(function (info) {
      var xIndex = info.x - 1;
      var yIndex = info.y - 1;
      var initialIndex = yIndex * data.sizeX + xIndex;
      dataArray[initialIndex].number = info.number;
      for (var j = 0; j < info.length; j++) {
        var cell = dataArray[initialIndex];
        cell.empty = false;
        cell.across = info.number;
        initialIndex += data.sizeX;
      }
    });


    $scope.data = data;
    $scope.gridData = dataArray;

    var cellWidth = (100.00 / data.sizeX) + '%';
    $scope.cellStyle = {
      height: cellWidth,
      width: cellWidth
    };
    $scope.gridStyle = {
      height: (40.00 * data.sizeY / data.sizeX) + 'vw'
    }
  });
});