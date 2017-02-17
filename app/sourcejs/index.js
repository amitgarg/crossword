var angular = require('angular');
var myapp = angular.module('myApp', []);

myapp.factory('DataService', function () {
  var service = {};
  var data = {
      sizeX: 9,
      sizeY: 9,
      across: [
        {number: 1, x: 1, y:1, desc: "row1", length:9},
        {number: 5, x: 1, y:3, desc: "row2", length:4},
        {number: 7, x: 6, y:3, desc: "row3", length:4},
        {number: 8, x: 3, y:5, desc: "row4", length:5},
        {number: 11, x: 1, y:7, desc: "row5", length:4},
        {number: 12, x: 6, y:7, desc: "row6", length:4},
        {number: 13, x: 1, y:9, desc: "row7", length:9}
      ],
      down: [
        {number: 2, x: 2, y:1, desc: "col1", length:4},
        {number: 3, x: 6, y:1, desc: "col2", length:7},
        {number: 4, x: 8, y:1, desc: "col3", length:4},
        {number: 6, x: 4, y:3, desc: "col4", length:7},
        {number: 9, x: 2, y:6, desc: "col5", length:4},
        {number: 10, x: 8, y:6, desc: "col6", length:4}
      ]  
    };
  service.query = function () {
    return data;
  };  
  return service;
});

myapp.controller("MainCtrl", function ($scope, DataService) {
  var data = DataService.query();
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