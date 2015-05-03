var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://admin:edenhack@104.131.122.35:5432/Eden');
var bcrypt = require('bcrypt');

exports.User = sequelize.define('User', {
    userType : Sequelize.STRING,
	firstName : Sequelize.STRING,
	lastName : Sequelize.STRING,
	username : Sequelize.STRING,
	password : { 
        type : Sequelize.STRING,
        set:  function(v) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(v, salt);
            this.setDataValue('password', hash);
        }

    },
	email : Sequelize.STRING
	}, {
	tableName : 'users',
	timestamps : true,
	updatedAt : 'modifiedDate',
	createdAt : 'createdDate'
	}, {
    paranoid: true,
    instanceMethods: {
      setPassword: function(password, done) {
        return bcrypt.genSalt(10, function(err, salt) {
          return bcrypt.hash(password, salt, function(error, encrypted) {
            this.password = encrypted;
            this.salt = salt;
            return done();
          });
        });
      },
      verifyPassword: function(password, done) {
        return bcrypt.compare(password, this.password, function(err, res) {
          return done(err, res);
        });
      }
    }
});


exports.User.sync();