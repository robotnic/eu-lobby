'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var secret = options.secret;

  return function (hook) {
    var token = hook.params.token;

    if (!token) {
      return Promise.resolve(hook);
    }

    if (!secret) {
      // Try to get the secret from the app config
      var authOptions = hook.app.get('auth');

      if (authOptions && authOptions.token && authOptions.token.secret) {
        secret = authOptions.token.secret;
      } else {
        throw new Error('You need to pass `options.secret` to the verifyToken() hook or set `auth.token.secret` it in your config.');
      }
    }

    return new Promise(function (resolve, reject) {
      _jsonwebtoken2.default.verify(token, secret, options, function (error, payload) {
        if (error) {
          // Return a 401 if the token has expired or is invalid.
          return reject(new _feathersErrors2.default.NotAuthenticated(error));
        }

        // Attach our decoded token payload to the params
        hook.params.payload = payload;

        resolve(hook);
      });
    });
  };
};

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/**
 * Verifies that a JWT token is valid
 * 
 * @param  {Object} options - An options object
 * @param {String} options.secret - The JWT secret
 */