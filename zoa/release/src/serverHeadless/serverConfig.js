/**
 * @fileoverview serverConfig.js provides configuration information
 */
'use strict';
var zoa = require('./zoa');


/**
 * @constructor
 */
zoa.Config = function() {
  this.fs = require('fs');  // for writing out the package
  this.os = require('os');  // for getting the IP address
  this.package = require('./package.json'); 
  this.path = require('path');  // to normalize the directory paths

  this.package.debug = !!this.package.debug;  // sets false if does not exist

  this.setWebRoot(this.path.normalize(this.getWebRoot()));
};


/**
 * @return {*} return a config value by key.
 */
zoa.Config.prototype.get = function (key) {
  return this.package[key];
};


/**
 * Set a config key/value pair.
 * @param {string} key as a name
 * @param {*} value for the key
 * @return {object} this for chaining functions.
 */
zoa.Config.prototype.set = function (key, value) {
  this.package[key] = value;
  return this;
};


/**
 * @return {string} the current version.
 */
zoa.Config.prototype.getVersion = function () {
  return this.package.version;
};


/**
 * @return {string} the title of the application.
 * Note that package.name is a node id (does not allow spaces).
 */
zoa.Config.prototype.getTitle = function () {
  return this.package.server.title;
};


/**
 * @return {boolean} true if debug set to true
 */
zoa.Config.prototype.isDebugging = function () {
  return this.package.debug;
};


/**
 * Write the config out with the current settings using two-space indentation.
 * @param {string} opt_file is where to save the state if not package.json.
 */
zoa.Config.prototype.saveState = function (opt_file) {
  var file = opt_file || 'package.json';
  var data = JSON.stringify(this.package, null, '  ');
  this.fs.writeFileSync(file, data);
};


/**
 * Get the IP addresses for the machine
 * @return {array[string]} array of ip addresses as strings
 */
zoa.Config.prototype.getIpAddressList = function() {
  var networkObj = this.os.networkInterfaces();
  var propertyList = Object.keys(networkObj);
  var ipList = [];

  var propertyCount = propertyList.length;
  for (var i = 0; i < propertyCount; ++i) {
    var propertyName = propertyList[i];
    var property = networkObj[propertyName];
    if (Array.isArray(property)) {
      var count = property.length;
      for (var j = 0; j < count; ++j) {
        var obj = property[j];
        if (obj.address && obj.address.indexOf('.') > -1 &&
            obj.address.indexOf('127.0.0') != 0) {
          ipList.push(obj.address);
        }
      }
    }
  }

  return ipList;
};


/**
 * @return {string} the port
 */
zoa.Config.prototype.getPort = function() {
  return this.package.server.port;
};


/**
 * @return {string} the root for the web server
 */
zoa.Config.prototype.getWebRoot = function() {
  return this.package.server.webRoot;
};


/**
 * @param {string} newWebRoot sets the webRoot for the web server. Must be
 *     called before the server has started.
 * @return {object} this for chaining
 */
zoa.Config.prototype.setWebRoot = function(newWebRoot) {
  this.package.server.webRoot = newWebRoot;
  return this;
};


module.exports = zoa.Config;
