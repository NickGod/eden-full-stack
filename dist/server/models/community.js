var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://admin:edenhack@104.131.122.35:5432/Eden');

exports.Community = sequelize.define('Community', {
    communityId : {
		type : Sequelize.UUID,
		primaryKey : true,
		defaultValue : Sequelize.UUIDV4,
		allowNulls : false	
	},
	name : Sequelize.STRING,
	description : Sequelize.STRING
	}, {
	tableName : 'communities',
	timestamps : true,
	updatedAt : 'modifiedDate',
	createdAt : 'createdDate',
    //deletedAt : 'deletedDate',
    paranoid: true,
    instanceMethods: {
    }
});


this.Community.sync();
this.Community.findOrCreate({
	where : {
		name : 'Hyperhydrosis'
	},
	defaults : {
		name : 'Hyperhydrosis',
		description : 'Community for those afflicted with hyperhydrosis'
	}
});

this.Community.findOrCreate({
	where : {
		name : 'Obesity'
	},
	defaults : {
		name : 'Obesity',
		description : 'Community for those afflicted with Obesity'
	}
});