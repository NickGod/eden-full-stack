'use strict';

app.controller('NewsCtrl', function ($window, $scope, $location, News, Auth) {
  $scope.posts = [ {title: 'a', content: 'a'},  {title: 'b', content: 'b'},  {title: 'c', content: 'c'}];
  $scope.user = Auth.user;

  $scope.news = {title: '', content: ''};

  $scope.deletePost = function(news) {
    News.delete(news);
  };

  // $scope.post = {title: '', content:''};
  // $scope.signedIn = Auth.signedIn;
  // $scope.logout = Auth.logout;
  // $scope.user = Auth.user;

  //submitPost in NewsCtrl goes to news
  $scope.submitPost = function() {
  	$window.alert("Submitting a Post!");
  	$window.alert($scope.user);
    $scope.news.creator = $scope.user.profile.username;
    $scope.news.creatorUID = $scope.user.uid;
    $scope.posts.push($scope.news);

    $window.alert($scope.posts.length);
    $window.alert($scope.posts);
    $window.alert($scope.posts[0]['title']);
    $window.alert($scope.news['title']);

    $scope.news = {title: '', content: ''};
    // News.create($scope.post).then(function (ref) {
    //   $location.path('/news/' + ref.name());
    //   $scope.post = {title: '', content: ''};
    // });
  };


});
