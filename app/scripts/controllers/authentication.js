'use strict';

app.controller('AuthenticationCtrl', function ($scope, $location, $window, AuthService) {
if (AuthService.user()) {
    $location.path('/');
  }
   
  $scope.registerUser = function(){
    AuthService.register($scope.user, function (data) {
      if(data.errors){
          $scope.errors = data.errors;
      }
      else if(data.success){
        $location.path('/dashboard');
      };
    }); 
  };
  
  $scope.loginUser = function(){
    AuthService.login($scope.user, function(data){
      if(data.errors){
          $scope.errors = data.errors;
      }
      else if(data.success){
        $location.path('/dashboard');
      };
    });
  };
  
  $scope.logoutUser = function(){
    AuthService.logout(function(data){
      if(data.success){
        $location.path('/');
      }
    });
  };
});