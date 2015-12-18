/**
 * @fileoverview serverServer.js is the actual HTML server, based on e
 * TODO: write to a file or database
 */
'use strict';
var zoa = require('./zoa');



/**
 * @constructor
 */
zoa.Server = function (config, logger) {
  this.expressModule = require('express');
  this.fsModule = require('fs');
  this.pathModule = require('path');

  this.dirName = process.cwd();
  this.ipList = config.getIpAddressList();
  this.logger = logger;
  this.port = config.getPort();
  this.webRoot = config.getWebRoot();

  this.express = this.expressModule();  // set up the express html server
  this.setUpRoutes();  // a route is access to a page or cmd

  // start the html server listening for requests
  this.express.listen(this.port, this.handleServerListening.bind(this));
};


/**
 * A route is a server request for a page or command. This also logs
 * requests and handles any bad requests (e.g. 404). The order of the
 * route handling is important.
 */
zoa.Server.prototype.setUpRoutes = function() {
  // always do this route: log the request
  this.express.use(function(req, res, next) {
     var msg = [req.method, ' received: ', req.url].join('');
     this.logger.log(msg);
     next();
  }.bind(this));

  // map index.htm to index.html
  this.express.get('/index.htm', function(req, res) {
    res.sendFile(self.pathModule.normalize([this.dirName, 
                                            this.webRoot, 
                                            'index.html'].join('/')));
  }.bind(this));
	
//route: Write a file
	this.express.get('/write', function(req, res) {
	console.log(req.query.file,req.query.data);
	//console.log(req.query.content);
    this.fsModule.writeFile(req.query.file, req.query.data, function (err) {
	  if (err) {console.log(err);}
	  else {console.log('successful write');}
	});
	res.status(200).send('success!');
  }.bind(this));
	
//route: read a file
	this.express.get('/read', function(req, res) {
		console.log(req.query); //requested file name
		this.fsModule.readFile(req.query.fileName, function(err,data) {
			if (err) {console.log(err); res.status(200).send(err);}
			else {res.status(200).send(data);}
			});
		
	  }.bind(this));
	
  // route: handle static file requests
  this.express.use(this.expressModule.static(this.webRoot));

  // route: display 404 page
  this.express.use(function(req, res) {
    res.status(404).send('404 - not found');
  }.bind(this));

 
  // route: handle all other errors. This should appear AFTER all other routes
  this.express.use(function(err, req, res, next) {
    console.error(err.stack);
    this.logger.log(err.stack);
    res.status(500).send('500 - server error');
  }.bind(this));
};


/**
 * When the server starts listening, update the subtitle with the ip
 * address and log the start.
 */
zoa.Server.prototype.handleServerListening = function() {
  // build a string from the list of ip addresses
  var ipCount = this.ipList.length;
  for (var i = 0; i < ipCount; ++i) {
    this.ipList[i] = [this.ipList[i], ':', this.port].join('');
  }
  var ipString = this.ipList.join(', ');

  var msg = ['server started on:', ipString].join(' ');
  this.logger.log(msg);
  this.logger.log('Press ^C^C to stop the server');
};

module.exports = zoa.Server;
