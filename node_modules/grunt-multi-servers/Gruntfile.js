module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    servers: {
      test: {
        cmd: "node",
        args: ["test/fixture/hello.js"],
        ports: [3000, 3001, 3002],
      }
    },
    mochaTest: {
        test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    }
  });
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.registerTask('test', ['servers:test', 'mochaTest']);
};
