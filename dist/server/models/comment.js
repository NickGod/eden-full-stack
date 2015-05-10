var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://admin:edenhack@104.131.122.35:5432/Eden');
var User = require('./user').User;
var Post = require('./post').Post;

exports.Comment = sequelize.define('Comment', {
    commentId : {
		type : Sequelize.UUID,
		primaryKey : true,
		defaultValue : Sequelize.UUIDV4,
		allowNulls : false	
	},
	postId : Sequelize.UUID,
	userId : Sequelize.UUID,
	text : Sequelize.STRING,
	}, {
	tableName : 'comments',
	timestamps : true,
	updatedAt : 'modifiedDate',
	createdAt : 'createdDate',
    //deletedAt : 'deletedDate',
    paranoid: true,
    instanceMethods: {
    }
});

this.Comment.belongsTo(User, { foreignKey : 'userId' } );
this.Comment.belongsTo(Post, { foreignKey : 'postId'} );

this.Comment.sync();