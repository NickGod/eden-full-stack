'use strict';
app.factory('PgAuth', function($http, $rootScope){
    var PgAuth = {
    register: function(user, next){
      $http.post('/register', {
        username : user.username,
        firstName : user.firstName,
        lastName : user.lastName,
        password : user.password,
        email : user.email
      }).
        success(function(data, status, headers, config) {
          next(data);
      })
      .error(function(data, status, headers, config) {
  	     console.log(data);
      });
    },
  };
  
  return PgAuth;
});

app.factory('Auth', function ($firebaseSimpleLogin, FIREBASE_URL, $rootScope, $firebase) {
  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseSimpleLogin(ref);

  //facebook login

  // ref.authWithOAuthPopup("facebook", function(error, authData) {
  // if (error) {
  //   console.log("Login Failed!", error);
  // } else {
  //   console.log("Authenticated successfully with payload:", authData);
  // }
  // });

  var Auth = {
    register: function (user) {
      return auth.$createUser(user.email, user.password);
    },
    createProfile: function (user) {
      var profile = {
        username: user.username,
        md5_hash: user.md5_hash
      };

      var profileRef = $firebase(ref.child('profile'));
      return profileRef.$set(user.uid, profile);
    },
    login: function (user) {
      return auth.$login('password', user);
    },
    logout: function() {
      auth.$logout();
    },
    resolveUser: function() {
      return auth.$getCurrentUser();
    },
    signedIn: function() {
      return !!Auth.user.provider;
    },
    user: {}
  };

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    angular.copy(user, Auth.user);
    Auth.user.profile = $firebase(ref.child('profile').child(Auth.user.uid)).$asObject();
  });
  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    if (Auth.user && Auth.user.profile) {
      Auth.user.profile.$destroy();
    }
    angular.copy({}, Auth.user);
  });

  return Auth;
});
