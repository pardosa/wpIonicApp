angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('CommentsCtrl', function($scope, $state, $http, $q) {
  
    var defer = $q.defer();

    $http.get("http://localhost:3131/comments")
      .success(function(res){
        console.log('CommentsCtrl success: ', res);
        $scope.comments = res;
        defer.resolve(res);
      })
      .error(function(status, err){
        console.log('CommentsCtrl error');
        defer.reject(status);
      });

      $scope.items = [];
  $scope.loadMore = function() {
    $http.get('/more-items').success(function(items) {
      useItems(items);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $scope.$on('$stateChangeSuccess', function() {
    $scope.loadMore();
  });

  
})

.controller('CommentCtrl', function($scope, $stateParams, $http, $q) {
  
    var defer = $q.defer();
    $http.get("http://localhost:3131/comment/"+ $stateParams.id)
      .success(function(res){
        $scope.comment = res;
        defer.resolve(res);
      })
      .error(function(status, err){
        console.log('CommentsCtrl error');
        defer.reject(status);
      });

      $scope.items = [];
  
});
