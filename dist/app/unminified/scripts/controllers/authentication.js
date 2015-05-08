'use strict';

app.controller('AuthenticationCtrl', function ($scope, $location, $window, PgAuth) {
if (PgAuth.user) {
    $location.path('/');
  }
   
  $scope.registerUser = function(){
    PgAuth.register($scope.user, function (data) {
      if(data.errors){
          $scope.errors = data.errors;
      }
      else if(data.success){
        $location.path('/dashboard');
      };
    }); 
  };
  
  $scope.loginUser = function(){
    PgAuth.login($scope.user, function(data){
      if(data.errors){
          $scope.errors = data.errors;
      }
      else if(data.success){
        $location.path('/dashboard');
      };
    });
  };
  
  $scope.logoutUser = function(){
    PgAuth.logout(function(data){
      if(data.success){
        $location.path('/');
      }
    });
  };
});