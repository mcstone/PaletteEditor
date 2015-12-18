/**
 * @fileoverview main.js is the main entry point for the zoa server.
 */
'use strict';
var zoa = require('./zoa');
require('./serverConfig');
require('./serverLogger');
require('./serverServer');
require('fs');
require('path');


/**
 * @constructor
 */
zoa.ServerMain = function () {
  this.config = new zoa.Config();
  this.logger = new zoa.Logger();
  this.server = new zoa.Server(this.config, this.logger);

  // create a message that the zoa server has started
  var msg = [this.config.getTitle(), 
             ' (v', this.config.getVersion(), ')',
            this.config.isDebugging() ? ' (debug ON)' : ''
           ].join('');

 this.logger.log(msg);
};


// start the app
new zoa.ServerMain();

