angular.module('starter.controllers', ['ngResource'])

.controller('WelcomeCtrl', ['$scope', '$http', 'Settings', function($scope, $http, Settings) {
  console.log(Settings.api_domain)
  $http.get(Settings.api_domain + "/wap_api/bargains/welcome?per=10").success(function(data){
    $scope.items = data.bargains;
  }).error(function(){
    alert(Settings.api_domain + '信息获取失败');
  });

  $scope.moreDataCanBeLoaded = true;

  $scope.doRefresh = function() {
    if($scope.items){
      var newest_created_at = $scope.items[0].created_at
      $http.get(Settings.api_domain + "/wap_api/bargains/welcome_new?created_at=" + newest_created_at).success(function(data){
        data.bargains.reverse().forEach(function(element, index, array){
          if(element.created_at > newest_created_at){
            $scope.items.unshift(element);
          }
        });
        $scope.$broadcast("scroll.refreshComplete");
      }).error(function(){
        alert('doRefresh失败');
      });
    }else{
      $scope.$broadcast("scroll.refreshComplete");
    }
  };

  $scope.loadMore = function() {
    if($scope.items){
      var oldest_created_at = $scope.items[$scope.items.length - 1].created_at
      $http.get(Settings.api_domain + "/wap_api/bargains/welcome?created_at=" + oldest_created_at + "&per=10").success(function(data){
        data.bargains.forEach(function(element, index, array){
          if(element.created_at < oldest_created_at){
            $scope.items.push(element);
          }
        });
        $scope.$broadcast("scroll.infiniteScrollComplete");
        if(data.bargains.length == 0){
          $scope.moreDataCanBeLoaded = false;
        }
      }).error(function(){
        alert('loadMore失败');
      });
    }else{
      $scope.$broadcast("scroll.infiniteScrollComplete");
    }
  };

}])

.controller('BargainCtrl', ['$scope', '$http', 'Settings', function($scope, $http, Settings) {
  $http.get(Settings.api_domain + "/wap_api/bargains/rank").success(function(data){
    $scope.items = data.bargains;
  }).error(function(){
    alert(Settings.api_domain + '信息获取失败');
  });

}])

.controller('ProductCtrl', ['$scope', '$http', '$stateParams', 'Settings', function($scope, $http, $stateParams, Settings) {
  $http.get(Settings.api_domain + "/wap_api/products/show?id=" + $stateParams.productId).success(function(data){
    $scope.product = data;
  }).error(function(){
    alert(Settings.api_domain + '信息获取失败');
  });
}])