/**
 * @fileoverview index.js is the javascript main entry point of the app.
 */
/*jslint nomen: true    */
/*jslint plusplus: true */
/*jslint todo: true     */
/*jslint browser: true  */
'use strict';


var zoa = {};  // create a namespace

/**
 *
 * @constructor
 */
zoa.Main = function () {
};

// start the app once the HTML dom has loaded
window.addEventListener('load', function () { new zoa.Main(); }, false);
