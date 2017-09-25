'use strict';

var request = require('./request');
var promise = require('bluebird');

var dribbble = {};
dribbble.jsonp = false;
dribbble.accessToken = null;

dribbble.shot = function (id, opts) {
  opts = opts ? opts : {};
  opts['access_token'] = this.accessToken;
  
  var promise = request('/shots/' + id, opts);

  promise.rebounds = function (opts) {
    return request('/shots/' + id + '/rebounds', opts);
  };

  promise.comments = function (opts) {
    return request('/shots/' + id + '/comments', opts);
  };

  return promise;
};

dribbble.shots = function (name, opts) {
  return request('/shots/' + name, opts);
};

dribbble.player = function (id, opts) {
  var promise = request('/users/' + id, opts);

  promise.shots = function (opts) {
    return request('/users/' + id + '/shots', opts);
  };

  promise.likes = function (opts) {
    return request('/users/' + id + '/likes', opts);
  };

  promise.followers = function (opts) {
    return request('/users/' + id + '/followers', opts);
  };

  promise.following = function (opts) {
    return request('/users/' + id + '/following', opts);
  };

  return promise;
};

module.exports = dribbble;
