module.exports = function(grunt) {
  "use strict";
  var servers = [];
  var defaults = {
    cmd : "node",
    args : [],
    ports : [3000],
    signal : "SIGTERM",
    keepalive: false,
    opts :{ stdio : ['ignore', process.stdout, process.stderr] }
  };
  var _ = require("lodash");
  var signal = "SIGTERM";
  var stop = function() {
      _.each(servers, function(server) {
          if (server) {
              grunt.log.writeln('Stopping'.red + ' server');
              server.kill(signal);
              process.removeAllListeners();
          }
      });
      servers = [];
  };

  grunt.registerMultiTask('servers', 'Launch servers with port', function(arg){
      var done = this.async();
      _.each(servers, function(server) {
          if (server) {
              stop();
          }
      });

      var cmd = this.data.cmd || defaults.cmd;
      var args = this.data.args || defaults.args;
      var ports = this.data.ports || defaults.ports;
      var opts = this.data.opts || defaults.opts;
      var keepalive = this.data.keepalive || defaults.keepalive;
      signal = this.data.signal || defaults.signal;
      console.log(cmd + " " + args);
      if (!args.length) grunt.fail.fatal("args must specify.");
      _.each(ports, function(port) {
          process.env.PORT = port;
          var new_server = grunt.util.spawn({
              cmd: cmd,
              args: args,
              opts: opts
          }, function(){});
          process.on('exit', stop);
          servers.push(new_server);
      });
      if (!keepalive) {
          setTimeout(function(){done();}, 1000);
      }
  });
};
