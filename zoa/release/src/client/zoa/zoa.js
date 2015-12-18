/**
 * @fileoverview zoa.js creates the namespace for zoa
 */
'use strict';
var zoa = {};


/**
 * prevent the window from moving on a mobile device when you pull down
 */
zoa.init = function() {
  // prevent the window from moving on a mobile device when you pull down
  this.firstMove;
  window.addEventListener('touchstart', function (e) {
    this.firstMove = true;
  });

  window.addEventListener('touchmove', function (e) {
    if (this.firstMove) {
      e.preventDefault();
      this.firstMove = false;
    }
  });
};


/**
 * add a function for handling a mouse click or touch on an element
 * note it uses a selector, so include '.class' or '#ident'
 * or you can pass in an HTML DOM object
 */
zoa.addClick = function(selector, fn) {
  if (!fn) {
    console.log('error: zoa.addClick() missing the function parameter');
    return;
  }

  var ele = selector;
  if (typeof selector === 'string') {
    var ele = document.querySelector(selector);
  }

  if (!ele) {
    console.log('error: zoa.addClick() with a bad selector', selector);
    return;
  }

  var clickEventName = 'ontouchstart' in window ? 'touchstart' : 'click';  
  ele.addEventListener(clickEventName, fn);
};
