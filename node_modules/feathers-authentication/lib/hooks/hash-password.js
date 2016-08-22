'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  options = Object.assign({}, defaults, options);

  return function (hook) {
    if (!hook.data || !hook.data[options.passwordField]) {
      return hook;
    }

    return new Promise(function (resolve, reject) {
      _bcrypt2.default.genSalt(10, function (err, salt) {
        _bcrypt2.default.hash(hook.data[options.passwordField], salt, function (err, hash) {
          if (err) {
            return reject(err);
          }

          hook.data[options.passwordField] = hash;
          resolve(hook);
        });
      });
    });
  };
};

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Replaces a password located at the provided `passwordField` with a hash
 * of the password.
 * @param  {String} passwordField  The field containing the password.
 */
var defaults = { passwordField: 'password' };

module.exports = exports['default'];