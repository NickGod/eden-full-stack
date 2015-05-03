'use strict';

app.controller('AuthenticationCtrl', function ($scope, $location, PgAuth) {
/*
  if (user) {
    $location.path('/');
  }
 */
 
  $scope.registerUser = function(){
    PgAuth.register($scope.user, function (data) {
      if(data.errors){
          $scope.errors = data.errors;
      }
      else if(data.success){
        $location.path('/');
      };
    });
    
  };
});