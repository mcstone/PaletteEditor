/**
 * @fileoverview csv.js is a wrapper for npm fast-csv to read in csv files.
 * For more info, see: https://www.npmjs.com/package/fast-csv
 */
/*jslint nomen: true    */
/*jslint plusplus: true */
/*jslint todo: true     */
'use strict';
var zoa = require('./zoa');

/**
 * @constructor
 */
zoa.Csv = function (pathName) {
  this.csv = require('fast-csv');
};


/**
 *
 */
zoa.Csv.prototype.read = function (pathName, cb, errorCb) {
  var data = [];
  try {
    this.csv
     .fromPath(pathName)
     .on('data', function(row){ data.push(row); })
     .on('end', function(){ cb(data); });
  } catch(e) {
    if (errorCb) {
      errorCb(e, pathName);
    } else {
      console.log('Error: csv.js reading ', pathName, e);
    }
  }
};


/**
 * @param {array[array]]} data is an array of arrays. For example:
 *     data = [
 *              ['a', 'b'],
 *              ['c', 'd']
 *            ];
 */
zoa.Csv.prototype.write = function (pathName, data, cb) {
  this.csv.writeToPath(pathName, data, {headers:true}).on('finish', cb);

};

module.exports = zoa.Csv;
