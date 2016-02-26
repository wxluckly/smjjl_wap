angular.module('starter.controllers', ['ngResource'])

.controller('WelcomeCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get("http://smjjl.dev/wap_api/bargains/welcome?per=10").success(function(data){
    $scope.items = data.bargains;
    console.log(data.bargains)
  }).error(function(){
    alert('信息获取失败');
  });

  $scope.doRefresh = function() {
    $http.get("http://smjjl.dev/wap_api/bargains/welcome?per=10").success(function(data){
      data.bargains.forEach(function(element, index, array){
        $scope.items.unshift(element);
      });
      $scope.$broadcast("scroll.refreshComplete");
    }).error(function(){
      alert('信息获取失败');
    });
    
  };

}])

.controller('BargainCtrl', function($scope) {})