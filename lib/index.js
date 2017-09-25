'use strict';

var request = require('./request');
var promise = require('bluebird');

var dribbble = {};
dribbble.jsonp = false;
dribbble.accessToken = null;

dribbble._buildOptions = function (options) {
  options = options ? options : {};
  options['access_token'] = this.accessToken;
  return options;
}

dribbble.shot = function (id, opts) {
  var promise = request('/shots/' + id, this._buildOptions(opts));

  promise.rebounds = (opts) => {
    return request('/shots/' + id + '/rebounds', this._buildOptions(opts));
  };

  promise.comments = (opts) => {
    return request('/shots/' + id + '/comments', this._buildOptions(opts));
  };

  return promise;
};

dribbble.shots = function (name, opts) {
  return request('/shots/' + name, this._buildOptions(opts));
};

dribbble.player = function (id, opts) {
  var promise = request('/users/' + id, this._buildOptions(opts));

  promise.shots = (opts) => {
    return request('/users/' + id + '/shots', this._buildOptions(opts));
  };

  promise.likes = (opts) => {
    return request('/users/' + id + '/likes', this._buildOptions(opts));
  };

  promise.followers = (opts) => {
    return request('/users/' + id + '/followers', this._buildOptions(opts));
  };

  promise.following = (opts) => {
    return request('/users/' + id + '/following', this._buildOptions(opts));
  };

  return promise;
};

module.exports = dribbble;
