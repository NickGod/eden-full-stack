grunt-multi-servers
===================

[![Build Status](https://travis-ci.org/yosuke-furukawa/grunt-multi-servers.png?branch=master)](https://travis-ci.org/yosuke-furukawa/grunt-multi-servers)

This plugin can launch multiple servers.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-multi-servers --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-multi-servers');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-coffee/tree/grunt-0.3-stable).*

## Configure
```javascript
  'use strict';
  grunt.initConfig({
    servers: {
      test: {
        // command name default is node
        cmd: "node",
        // arguments, required
        args: ["test/fixture/hello.js"],
        // port settings
        ports: [3000, 3001, 3002],
        // keepalive default is false
        keepalive: false,
      }
    }
  });
  grunt.loadNpmTasks('grunt-multi-servers');
```
