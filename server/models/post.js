var Sequelize = require('sequelize');
var User = require('./user').User;
var Community = require('./community').Community;

var sequelize = new Sequelize('postgres://admin:edenhack@104.131.122.35:5432/Eden');

exports.Post = sequelize.define('Posts', {
    postId : {
		type : Sequelize.UUID,
		primaryKey : true,
		defaultValue : Sequelize.UUIDV4,
		allowNull : false	
	},
	communityId : { 
		type : Sequelize.UUID,
		allowNull : false
	},
	userId : { 
		type : Sequelize.UUID,
		allowNull : false
	},
	title : { 
		type : Sequelize.STRING,
		allowNull : false
	},
	body : Sequelize.STRING,
	upvoteCount : {
		type : Sequelize.INTEGER,
		defaultValue : 1
	}
	}, {
	tableName : 'posts',
	timestamps : true,
	updatedAt : 'modifiedDate',
	createdAt : 'createdDate',
    deletedAt : 'deletedDate',
    paranoid: true,
    instanceMethods: {
    }
});

this.Post.belongsTo(User, {foreignKey : 'userId' });
this.Post.belongsTo(Community, { foreignKey : 'communityId'});

this.Post.sync();