'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hashPassword = require('./hash-password');

var _hashPassword2 = _interopRequireDefault(_hashPassword);

var _queryWithUserId = require('./query-with-user-id');

var _queryWithUserId2 = _interopRequireDefault(_queryWithUserId);

var _requireAdminToSetAdmin = require('./require-admin-to-set-admin');

var _requireAdminToSetAdmin2 = _interopRequireDefault(_requireAdminToSetAdmin);

var _requireAuth = require('./require-auth');

var _requireAuth2 = _interopRequireDefault(_requireAuth);

var _restrictToSelf = require('./restrict-to-self');

var _restrictToSelf2 = _interopRequireDefault(_restrictToSelf);

var _setUserId = require('./set-user-id');

var _setUserId2 = _interopRequireDefault(_setUserId);

var _toLowerCase = require('./to-lower-case');

var _toLowerCase2 = _interopRequireDefault(_toLowerCase);

var _verifyToken = require('./verify-token');

var _verifyToken2 = _interopRequireDefault(_verifyToken);

var _populateUser = require('./populate-user');

var _populateUser2 = _interopRequireDefault(_populateUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hooks = {
  hashPassword: _hashPassword2.default,
  queryWithUserId: _queryWithUserId2.default,
  requireAdminToSetAdmin: _requireAdminToSetAdmin2.default,
  requireAuth: _requireAuth2.default,
  restrictToSelf: _restrictToSelf2.default,
  setUserId: _setUserId2.default,
  toLowerCase: _toLowerCase2.default,
  verifyToken: _verifyToken2.default,
  populateUser: _populateUser2.default
};

exports.default = hooks;
module.exports = exports['default'];