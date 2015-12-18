/**
 * @fileoverview serverLogger.js logs and displays server events.
 * TODO: write to a file or database
 */
'use strict';
var zoa = require('./zoa');
require('./date');


/**
 * @constructor
 */
zoa.Logger = function (parent) {
};


/**
 * Reads in the multiple parameters and creates a log entry.
 * For example: this.log('a', 'b', 'c');
 * @param {Array[string]} argv is a vector of arguments.
 */
zoa.Logger.prototype.log = function(argv) {
  console.log(this._createMessage(arguments));
};


/**
 * Reads in the multiple parameters and creates a log error entry.
 * For example: this.error('a', 'b', 'c');
 * @param {Array[string]} argv is a vector of arguments.
 */
zoa.Logger.prototype.error = function(argv) {
  console.error(this._createMessage(arguments));
};


/**
 * Private utility function to create a log message for stdout and stderr.
 * Prepend the date and time, turn the array into a single string.
 * @param{array[string]}, array of strings for the message
 * @return {string} a message string
 * @private
 */
zoa.Logger.prototype._createMessage = function(argv) {
  var date = zoa.Date.getDate();
  var time = zoa.Date.getTime();
  var args = Array.prototype.slice.call(argv, 0).join(' ');

  return [date, time, args].join(' ');
};

module.exports = zoa.Logger;
