'use strict';
app.factory('AuthService', function($http, $rootScope, $window, $cookieStore){
    var AuthService = {
    register: function(user, next){
      $http.post('/register', {
        username : user.username,
        firstName : user.firstName,
        lastName : user.lastName,
        password : user.password,
        email : user.email
      }).
        success(function(data, status, headers, config) {
          if(data.success){ 
            $window.sessionStorage.token = data.token;
            var currentUser = {
            loggedIn : true,
            userId : data.user.userId,
            username : data.user.username,
            email : data.user.email,
            firstName : data.user.firstName,
            lastName : data.user.lastName
          };
          $cookieStore.put('currentUser', currentUser);
          }
          next(data);
      })
      .error(function(data, status, headers, config) {
  	     next( {errors : 'Error registering user, please try again'});
      });
    },
    login: function(user, next){
      $http.post('/login', {
        username : user.username,
        password : user.password
      })
      .success(function(data, status, headers, config){
        if(data.success){
          $window.sessionStorage.token = data.token;
          var currentUser = {
            loggedIn : true,
            userId : data.user.userId,
            username : data.user.username,
            email : data.user.email,
            firstName : data.user.firstName,
            lastName : data.user.lastName
          };
         $cookieStore.put('currentUser', currentUser);
        }
        next(data);
      })
      .error(function(data, status, headers, config){
        next({errors : 'Error logging in user, please try again'});
      });
    },
    logout : function(next){
      $http.get('/logout')
      .success(function(data, status, headers, config){
        if(data.success){
          delete $window.sessionStorage.token;
           $cookieStore.remove('currentUser');
        }
        next(data);
      })
      .error(function(data, status, headers, config){
        next({errors : 'Error logging in user, please try again'});
      });
    },
    signedIn : function () {
      return !!$cookieStore.get('currentUser');
    },
    user : function() { return $cookieStore.get('currentUser'); },
  };
  
  return AuthService;
});