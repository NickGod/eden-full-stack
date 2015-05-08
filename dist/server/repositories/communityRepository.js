var Community = require('../models/community').Community;

exports.getAllCommunities = function(done){
    Community.findAll({attributes: [ 'communityId','name', 'description']})
    .then(function(communities){
        done(communities);
    });
};

exports.getCommunityByCommunityName = function(communityName, done){
    Community.findOne({where: {name : communityName}})
    .then(function(community){
        done(null, community);
    })
    .catch(function (err) {
        done(err, null);
    });
};