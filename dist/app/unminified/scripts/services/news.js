'use strict';

app.factory('News',
  function($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    var news = $firebase(ref.child('news')).$asArray();

    var News = {
      all: news,
      create: function (news) {
        alert("Create in news being called.");
        return news.$add(news).then(function(newsRef) {
          $firebase(ref.child('user_posts').child(news.creatorUID)).$push(newsRef.name());
          return newsRef;
        });
      },
      get: function (newsId) {
        return $firebase(ref.child('news').child(newsId)).$asObject();
      },
      delete: function (news) {
        return news.$remove(news);
      },
      comments: function (newsId) {
        return $firebase(ref.child('comments').child(newsId)).$asArray();
      }
    };

    return News;
  }
);
