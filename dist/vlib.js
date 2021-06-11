module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = function () {
  _createClass(Validator, null, [{
    key: 'STATUS_NONE',
    get: function get() {
      return 0;
    }
  }, {
    key: 'ERROR_LENGTH_MAX',
    get: function get() {
      return 'ERROR_LENGTH_MAX';
    }
  }, {
    key: 'ERROR_LENGTH_MIN',
    get: function get() {
      return 'ERROR_LENGTH_MIN';
    }
  }, {
    key: 'DEFAULT_ERROR_MESSAGE',
    get: function get() {
      return 'Undefined error';
    }
  }]);

  function Validator(input) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Validator);

    if (typeof input === 'undefined') {
      throw ReferenceError('\'input\' is not defined');
    }

    if (typeof options === 'undefined') {
      throw ReferenceError('\'options\' is not defined');
    } else if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
      throw TypeError('\'options\' should be of type of object');
    }

    this.errorId = null;

    this.valid = true;

    this.input = input;
    this.options = options;

    this.parsed = null;

    this.validate();
  }

  _createClass(Validator, [{
    key: 'error',
    value: function error(errorId) {
      this.valid = false;
      this.errorId = errorId;
      return false;
    }
  }, {
    key: 'prepareInput',
    value: function prepareInput() {
      return this.input;
    }
  }, {
    key: 'validate',
    value: function validate() {
      var input = this.prepareInput();

      // validate length
      if (this.options.length) {
        if (typeof this.options.length.min !== 'undefined') {
          if (typeof this.options.length.min === 'number') {
            if (input.length < this.options.length.min) {
              this.error(Validator.ERROR_LENGTH_MIN);
            }
          } else {
            throw new TypeError('Validator \'options.length.min\' should be numeric value');
          }
        }

        if (typeof this.options.length.max !== 'undefined') {
          if (typeof this.options.length.max === 'number') {
            if (input.length > this.options.length.max) {
              this.error(Validator.ERROR_LENGTH_MAX);
            }
          } else {
            throw new TypeError('Validator \'options.length.max\' should be numeric value');
          }
        }
      }
    }
  }, {
    key: 'errorMessage',
    get: function get() {
      if (this.errorId === Validator.ERROR_LENGTH_MIN) {
        return 'Input must not have less than ' + this.options.length.min + ' characters';
      } else if (this.errorId === Validator.ERROR_LENGTH_MAX) {
        return 'Input must not have more than ' + this.options.length.max + ' characters';
      }

      return Validator.DEFAULT_ERROR_MESSAGE;
    }
  }]);

  return Validator;
}();

exports.default = Validator;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IPAddressValidator = exports.URLValidator = exports.PhoneNumberValidator = exports.EmailValidator = exports.Validator = undefined;

var _Validator = __webpack_require__(0);

var _Validator2 = _interopRequireDefault(_Validator);

var _EmailValidator = __webpack_require__(2);

var _EmailValidator2 = _interopRequireDefault(_EmailValidator);

var _PhoneNumberValidator = __webpack_require__(3);

var _PhoneNumberValidator2 = _interopRequireDefault(_PhoneNumberValidator);

var _URLValidator = __webpack_require__(4);

var _URLValidator2 = _interopRequireDefault(_URLValidator);

var _IPAddressValidator = __webpack_require__(5);

var _IPAddressValidator2 = _interopRequireDefault(_IPAddressValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Validator = _Validator2.default;
exports.EmailValidator = _EmailValidator2.default;
exports.PhoneNumberValidator = _PhoneNumberValidator2.default;
exports.URLValidator = _URLValidator2.default;
exports.IPAddressValidator = _IPAddressValidator2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Validator2 = __webpack_require__(0);

var _Validator3 = _interopRequireDefault(_Validator2);

var _URLValidator = __webpack_require__(4);

var _URLValidator2 = _interopRequireDefault(_URLValidator);

var _IPAddressValidator = __webpack_require__(5);

var _IPAddressValidator2 = _interopRequireDefault(_IPAddressValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmailValidator = function (_Validator) {
  _inherits(EmailValidator, _Validator);

  _createClass(EmailValidator, null, [{
    key: 'USERNAME_SYMBOLS',
    get: function get() {
      return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!$&*-=\\^`|~#%‘+/?_{}/';
    }
  }, {
    key: 'USERNAME_SPECIAL_SYMBOLS',
    get: function get() {
      return '"().,:;<>@[\\]';
    }
  }, {
    key: 'STATUS_USERNAME',
    get: function get() {
      return 1;
    }
  }, {
    key: 'STATUS_USERNAME_STRING',
    get: function get() {
      return 2;
    }
  }, {
    key: 'STATUS_USERNAME_SUFFIX',
    get: function get() {
      return 4;
    }
  }, {
    key: 'STATUS_USERNAME_SUFFIX_STRING',
    get: function get() {
      return 8;
    }
  }, {
    key: 'STATUS_DOMAIN',
    get: function get() {
      return 16;
    }
  }, {
    key: 'STATUS_DONE',
    get: function get() {
      return 32;
    }
  }, {
    key: 'ERROR_FIRST_SYMBOL_IS_AT',
    get: function get() {
      return 'ERROR_FIRST_SYMBOL_IS_AT';
    }
  }, {
    key: 'ERROR_DOUBLE_AT',
    get: function get() {
      return 'ERROR_DOUBLE_AT';
    }
  }, {
    key: 'ERROR_USERNAME_EXCEEDES_64_CHARS',
    get: function get() {
      return 'ERROR_USERNAME_EXCEEDES_64_CHARS';
    }
  }, {
    key: 'ERROR_USERNAME_FIRST_SYMBOL_IS_DOT',
    get: function get() {
      return 'ERROR_USERNAME_FIRST_SYMBOL_IS_DOT';
    }
  }, {
    key: 'ERROR_USERNAME_LAST_SYMBOL_IS_DOT',
    get: function get() {
      return 'ERROR_USERNAME_LAST_SYMBOL_IS_DOT';
    }
  }, {
    key: 'ERROR_USERNAME_DOUBLE_DOT',
    get: function get() {
      return 'ERROR_USERNAME_DOUBLE_DOT';
    }
  }, {
    key: 'ERROR_UNSUPPORTED_CHARACTER',
    get: function get() {
      return 'ERROR_UNSUPPORTED_CHARACTER';
    }
  }, {
    key: 'ERROR_UNCLOSED_QUOTES',
    get: function get() {
      return 'ERROR_UNCLOSED_QUOTES';
    }
  }, {
    key: 'ERROR_DOMAIN_IS_MISSING',
    get: function get() {
      return 'ERROR_DOMAIN_IS_MISSING';
    }
  }]);

  function EmailValidator(input) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, EmailValidator);

    // Prevent addresses longer than 254 characters
    var _this = _possibleConstructorReturn(this, (EmailValidator.__proto__ || Object.getPrototypeOf(EmailValidator)).call(this, input, options));

    _this.options.length = _this.options.length || {};
    _this.options.length.max = _this.options.length.max || 254;

    _this.status = null;

    _this.hostValidator = null;

    _this.validate();
    return _this;
  }

  _createClass(EmailValidator, [{
    key: 'prepareInput',
    value: function prepareInput() {
      _get(EmailValidator.prototype.__proto__ || Object.getPrototypeOf(EmailValidator.prototype), 'prepareInput', this).call(this);

      this.parsed = {
        local: '',
        local_suffix: '',
        host: ''
      };

      // Trim leading spaces
      // Split to array of characters
      return this.input.replace(/(^\s*|\s*$)/, '').split('');
    }
  }, {
    key: 'validate',
    value: function validate() {
      var _this2 = this;

      _get(EmailValidator.prototype.__proto__ || Object.getPrototypeOf(EmailValidator.prototype), 'validate', this).call(this);
      if (!this.valid) {
        return this;
      }

      var input = this.prepareInput();

      // Initial status
      this.status = EmailValidator.STATUS_USERNAME;

      input.every(function (char, i) {
        if (_this2.status & EmailValidator.STATUS_USERNAME || _this2.status & EmailValidator.STATUS_USERNAME_SUFFIX) {
          if (EmailValidator.USERNAME_SYMBOLS.indexOf(input[i]) !== -1) {
            if (input[i] === '+') {
              _this2.status = EmailValidator.STATUS_USERNAME_SUFFIX;
            } else {
              _this2.parsed[_this2.status & EmailValidator.STATUS_USERNAME ? 'local' : 'local_suffix'] += input[i];
            }
          } else if (input[i] === '@') {
            if (i === 0) {
              return _this2.error(EmailValidator.ERROR_FIRST_SYMBOL_IS_AT);
            }

            if ((_this2.parsed.local + '+' + _this2.parsed.local_suffix).length > 64) {
              return _this2.error(EmailValidator.ERROR_USERNAME_EXCEEDES_64_CHARS);
            }

            _this2.status = EmailValidator.STATUS_DOMAIN;
          } else if (EmailValidator.USERNAME_SPECIAL_SYMBOLS.indexOf(input[i]) !== -1) {
            if (input[i] === '.') {
              // Check if dot is first
              if (i === 0) {
                return _this2.error(EmailValidator.ERROR_USERNAME_FIRST_SYMBOL_IS_DOT);
              }

              // Check if dot is last
              if (input[i + 1] === '@') {
                return _this2.error(EmailValidator.ERROR_USERNAME_LAST_SYMBOL_IS_DOT);
              }

              // Double dot check
              if (input[i - 1] === '.') {
                return _this2.error(EmailValidator.ERROR_USERNAME_DOUBLE_DOT);
              }

              _this2.parsed[_this2.status & EmailValidator.STATUS_USERNAME ? 'local' : 'local_suffix'] += '.';
            } else if (input[i] === '"') {
              _this2.parsed[_this2.status & EmailValidator.STATUS_USERNAME ? 'local' : 'local_suffix'] += '"';
              _this2.status = EmailValidator.STATUS_USERNAME_STRING;
            } else {
              // TODO: add more special character restrictions
            }
          }
        } else if (_this2.status & EmailValidator.STATUS_USERNAME_STRING || _this2.status & EmailValidator.STATUS_USERNAME_SUFFIX_STRING) {
          _this2.parsed[_this2.status & EmailValidator.STATUS_USERNAME_STRING ? 'local' : 'local_suffix'] += input[i];

          if (input[i] === '"' && input[i - 1] !== '\\') {
            _this2.status = _this2.status & EmailValidator.STATUS_USERNAME_STRING ? EmailValidator.STATUS_USERNAME : EmailValidator.STATUS_USERNAME_SUFFIX;
          }
        } else if (_this2.status & EmailValidator.STATUS_DOMAIN) {
          if (input[i] === '@') {
            return _this2.error(EmailValidator.ERROR_DOUBLE_AT);
          }

          _this2.parsed.host += input[i];
        } else {
          return _this2.error(EmailValidator.ERROR_UNSUPPORTED_CHARACTER);
        }

        return true;
      });

      if (this.errorId) {
        return this;
      }

      if (this.status === EmailValidator.STATUS_USERNAME_STRING || this.status === EmailValidator.STATUS_USERNAME_SUFFIX_STRING) {
        this.error(EmailValidator.ERROR_UNCLOSED_QUOTES);
        return this;
      } else if (this.status !== EmailValidator.STATUS_DOMAIN) {
        this.error(EmailValidator.ERROR_DOMAIN_IS_MISSING);
        return this;
      }

      if (this.parsed.host[0] === '[' && this.parsed.host[this.parsed.host.length - 1] === ']') {
        var host = this.parsed.host.slice(1, this.parsed.host.length - 1);
        this.hostValidator = new _IPAddressValidator2.default(host);
        if (!this.hostValidator.valid) {
          this.error(this.hostValidator.errorId);
        }
      } else {
        this.hostValidator = new _URLValidator2.default(this.parsed.host);
        if (!this.hostValidator.valid) {
          this.error(this.hostValidator.errorId);
        }
      }

      return this;
    }
  }, {
    key: 'errorMessage',
    get: function get() {
      if (_get(EmailValidator.prototype.__proto__ || Object.getPrototypeOf(EmailValidator.prototype), 'errorMessage', this) !== _Validator3.default.DEFAULT_ERROR_MESSAGE) {
        return _get(EmailValidator.prototype.__proto__ || Object.getPrototypeOf(EmailValidator.prototype), 'errorMessage', this);
      }

      if (this.errorId === EmailValidator.ERROR_FIRST_SYMBOL_IS_AT) {
        return '@ cannot be the first symbol of e-mail address';
      } else if (this.errorId === EmailValidator.ERROR_DOUBLE_AT) {
        return 'E-mail address cannot contain multiple @';
      } else if (this.errorId === EmailValidator.ERROR_USERNAME_EXCEEDES_64_CHARS) {
        return 'Username part of e-mail address must not have more than 64 characters';
      } else if (this.errorId === EmailValidator.ERROR_USERNAME_FIRST_SYMBOL_IS_DOT) {
        return 'Dot cannot be the first username character';
      } else if (this.errorId === EmailValidator.ERROR_USERNAME_LAST_SYMBOL_IS_DOT) {
        return 'Dot cannot be the last username character';
      } else if (this.errorId === EmailValidator.ERROR_USERNAME_DOUBLE_DOT) {
        return 'Dot cannot be next to another dot';
      } else if (this.errorId === EmailValidator.ERROR_UNSUPPORTED_CHARACTER) {
        return 'Unsupported character';
      } else if (this.errorId === EmailValidator.ERROR_UNCLOSED_QUOTES) {
        return 'Unclosed quotes';
      } else if (this.errorId === EmailValidator.ERROR_DOMAIN_IS_MISSING) {
        return 'Domain part is missing';
      }

      if (this.hostValidator && this.hostValidator.errorMessage) {
        return this.hostValidator.errorMessage;
      }

      return _Validator3.default.DEFAULT_ERROR_MESSAGE;
    }
  }]);

  return EmailValidator;
}(_Validator3.default);

exports.default = EmailValidator;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Validator2 = __webpack_require__(0);

var _Validator3 = _interopRequireDefault(_Validator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhoneNumberValidator = function (_Validator) {
  _inherits(PhoneNumberValidator, _Validator);

  function PhoneNumberValidator(input) {
    _classCallCheck(this, PhoneNumberValidator);

    return _possibleConstructorReturn(this, (PhoneNumberValidator.__proto__ || Object.getPrototypeOf(PhoneNumberValidator)).call(this, input));
  }

  return PhoneNumberValidator;
}(_Validator3.default);

exports.default = PhoneNumberValidator;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Validator2 = __webpack_require__(0);

var _Validator3 = _interopRequireDefault(_Validator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var URLValidator = function (_Validator) {
  _inherits(URLValidator, _Validator);

  _createClass(URLValidator, null, [{
    key: 'PROTOCOL_SYMBOLS',
    get: function get() {
      return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:/';
    }
  }, {
    key: 'HOST_SYMBOLS',
    get: function get() {
      return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.';
    }
  }, {
    key: 'PORT_SYMBOLS',
    get: function get() {
      return '0123456789';
    }
  }, {
    key: 'STATUS_PROTOCOL',
    get: function get() {
      return 1;
    }
  }, {
    key: 'STATUS_HOST',
    get: function get() {
      return 2;
    }
  }, {
    key: 'STATUS_PORT',
    get: function get() {
      return 4;
    }
  }, {
    key: 'STATUS_PATH',
    get: function get() {
      return 8;
    }
  }, {
    key: 'STATUS_HASH',
    get: function get() {
      return 16;
    }
  }, {
    key: 'STATUS_DONE',
    get: function get() {
      return 32;
    }
  }, {
    key: 'ERROR_UNKNOWN_PROTOCOL',
    get: function get() {
      return 'ERROR_UNKNOWN_PROTOCOL';
    }
  }, {
    key: 'ERROR_REQUIRED_PROTOCOL',
    get: function get() {
      return 'ERROR_REQUIRED_PROTOCOL';
    }
  }, {
    key: 'ERROR_REQUIRED_SECURED_PROTOCOL',
    get: function get() {
      return 'ERROR_REQUIRED_SECURED_PROTOCOL';
    }
  }, {
    key: 'ERROR_REQUIRED_INSECURED_PROTOCOL',
    get: function get() {
      return 'ERROR_REQUIRED_INSECURED_PROTOCOL';
    }
  }, {
    key: 'ERROR_REQUIRED_PORT',
    get: function get() {
      return 'ERROR_REQUIRED_PORT';
    }
  }, {
    key: 'ERROR_REQUIRED_PATH',
    get: function get() {
      return 'ERROR_REQUIRED_PATH';
    }
  }, {
    key: 'ERROR_REQUIRED_HASH',
    get: function get() {
      return 'ERROR_REQUIRED_HASH';
    }
  }, {
    key: 'ERROR_UNSUPPORTED_CHARACTER',
    get: function get() {
      return 'ERROR_UNSUPPORTED_CHARACTER';
    }
  }, {
    key: 'ERROR_UNSUPPORTED_HOST_CHARACTER',
    get: function get() {
      return 'ERROR_UNSUPPORTED_HOST_CHARACTER';
    }
  }, {
    key: 'ERROR_UNSUPPORTED_PORT_CHARACTER',
    get: function get() {
      return 'ERROR_UNSUPPORTED_PORT_CHARACTER';
    }
  }, {
    key: 'ERROR_HOST_MISSING',
    get: function get() {
      return 'ERROR_HOST_MISSING';
    }
  }, {
    key: 'ERROR_HOST_DOUBLE_DOT',
    get: function get() {
      return 'ERROR_HOST_DOUBLE_DOT';
    }
  }]);

  function URLValidator(input) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, URLValidator);

    var _this = _possibleConstructorReturn(this, (URLValidator.__proto__ || Object.getPrototypeOf(URLValidator)).call(this, input, options));

    _this.status = null;

    _this.validate();
    return _this;
  }

  _createClass(URLValidator, [{
    key: 'prepareInput',
    value: function prepareInput() {
      _get(URLValidator.prototype.__proto__ || Object.getPrototypeOf(URLValidator.prototype), 'prepareInput', this).call(this);

      if (!this.options.required) {
        this.options.required = [];
      }

      this.parsed = {
        protocol: '',
        host: '',
        port: '',
        path: '',
        hash: ''
      };

      // Trim leading spaces
      // Split to array of characters
      return this.input.replace(/(^\s*|\s*$)/, '').split('');
    }
  }, {
    key: 'validate',
    value: function validate() {
      var _this2 = this;

      _get(URLValidator.prototype.__proto__ || Object.getPrototypeOf(URLValidator.prototype), 'validate', this).call(this);
      if (!this.valid) {
        return this;
      }

      var input = this.prepareInput();

      var portRegexp = /^[a-zA-Z]+:\/\//;

      this.status = portRegexp.test(this.input) ? URLValidator.STATUS_PROTOCOL : URLValidator.STATUS_HOST;

      if (this.status === URLValidator.STATUS_HOST) {
        if (this.options.required.indexOf('protocol') !== -1) {
          this.error(URLValidator.ERROR_REQUIRED_PROTOCOL);
          return this;
        } else if (this.options.required.indexOf('secured') !== -1) {
          this.error(URLValidator.ERROR_REQUIRED_SECURED_PROTOCOL);
          return this;
        } else if (this.options.required.indexOf('insecured') !== -1) {
          this.error(URLValidator.ERROR_REQUIRED_INSECURED_PROTOCOL);
          return this;
        }
      }

      input.every(function (char, i) {
        // Protocol & Host
        if (_this2.status === URLValidator.STATUS_PROTOCOL) {
          if (input[i] === '/' && i > 1 && input[i - 1] === '/' && input[i - 2] === ':') {
            _this2.parsed.protocol = _this2.parsed.protocol.replace(':/', '');

            _this2.secured = _this2.parsed.protocol === 'https';

            if (_this2.parsed.protocol === 'https') {
              if (_this2.options.required.indexOf('insecured') !== -1) {
                return _this2.error(URLValidator.ERROR_REQUIRED_INSECURED_PROTOCOL);
              }
            } else if (_this2.parsed.protocol === 'http') {
              if (_this2.options.required.indexOf('secured') !== -1) {
                return _this2.error(URLValidator.ERROR_REQUIRED_SECURED_PROTOCOL);
              }
            } else {
              return _this2.error(URLValidator.ERROR_UNKNOWN_PROTOCOL);
            }

            _this2.status = URLValidator.STATUS_HOST;
            return true;
          }

          _this2.parsed.protocol += input[i];
        }

        // Host
        if (_this2.status === URLValidator.STATUS_HOST) {
          if (input[i] === ':') {
            _this2.status = URLValidator.STATUS_PORT;
            return true;
          } else if (input[i] === '/') {
            if (_this2.options.required.indexOf('port') !== -1) {
              return _this2.error(URLValidator.ERROR_REQUIRED_PORT);
            }

            _this2.status = URLValidator.STATUS_PATH;
          } else if (input[i] === '#') {
            if (_this2.options.required.indexOf('port') !== -1) {
              return _this2.error(URLValidator.ERROR_REQUIRED_PORT);
            }

            if (_this2.options.required.indexOf('path') !== -1) {
              return _this2.error(URLValidator.ERROR_REQUIRED_PATH);
            }

            _this2.status = URLValidator.STATUS_HASH;
            return true;
          } else if (URLValidator.HOST_SYMBOLS.indexOf(input[i]) !== -1) {
            _this2.parsed.host += input[i];
          } else {
            return _this2.error(URLValidator.ERROR_UNSUPPORTED_HOST_CHARACTER);
          }
        }

        // Port
        if (_this2.status === URLValidator.STATUS_PORT) {
          if (input[i] === '/') {
            _this2.status = URLValidator.STATUS_PATH;
          } else if (URLValidator.PORT_SYMBOLS.indexOf(input[i]) !== -1) {
            _this2.parsed.port += input[i];
          } else {
            return _this2.error(URLValidator.ERROR_UNSUPPORTED_PORT_CHARACTER);
          }
        }

        // Path
        if (_this2.status === URLValidator.STATUS_PATH) {
          if (input[i] === '#') {
            if (_this2.parsed.path === '/' && _this2.options.required.indexOf('path') !== -1) {
              return _this2.error(URLValidator.ERROR_REQUIRED_PATH);
            }

            _this2.status = URLValidator.STATUS_HASH;
          } else {
            _this2.parsed.path += input[i];
          }
        }

        // Hash
        if (_this2.status === URLValidator.STATUS_HASH) {
          _this2.parsed.hash += input[i];
        }

        return true;
      });

      if (this.parsed.host === '') {
        this.error(URLValidator.ERROR_HOST_MISSING);
        return this;
      }

      if (this.parsed.host.indexOf('..') !== -1) {
        this.error(URLValidator.ERROR_HOST_DOUBLE_DOT);
        return this;
      }

      if (this.parsed.port === '' && this.options.required.indexOf('port') !== -1) {
        this.error(URLValidator.ERROR_REQUIRED_PORT);
      } else if (this.parsed.path === '' && this.options.required.indexOf('path') !== -1) {
        this.error(URLValidator.ERROR_REQUIRED_PATH);
      } else if (this.parsed.hash === '' && this.options.required.indexOf('hash') !== -1) {
        this.error(URLValidator.ERROR_REQUIRED_HASH);
      }

      /*
      if (this.parsed.host !== 'localhost' && this.parsed.host.indexOf('.') === -1) {
        this.error('TODO'); // TODO
      }
      */

      return this;
    }
  }, {
    key: 'errorMessage',
    get: function get() {
      if (_get(URLValidator.prototype.__proto__ || Object.getPrototypeOf(URLValidator.prototype), 'errorMessage', this) !== _Validator3.default.DEFAULT_ERROR_MESSAGE) {
        return _get(URLValidator.prototype.__proto__ || Object.getPrototypeOf(URLValidator.prototype), 'errorMessage', this);
      }

      if (this.errorId === URLValidator.ERROR_UNKNOWN_PROTOCOL) {
        return 'Unknown protocol (\'http://\' or \'https://\') is required';
      } else if (this.errorId === URLValidator.ERROR_REQUIRED_PROTOCOL) {
        return 'Protocol (\'http://\' or \'https://\') is required';
      } else if (this.errorId === URLValidator.ERROR_REQUIRED_SECURED_PROTOCOL) {
        return 'Secured protocol (\'https://\') is required';
      } else if (this.errorId === URLValidator.ERROR_REQUIRED_INSECURED_PROTOCOL) {
        return 'Unsecured protocol (\'http://\') is required';
      } else if (this.errorId === URLValidator.ERROR_REQUIRED_PORT) {
        return 'Port is required';
      } else if (this.errorId === URLValidator.ERROR_REQUIRED_PATH) {
        return 'Path is required';
      } else if (this.errorId === URLValidator.ERROR_REQUIRED_HASH) {
        return 'Hash is required';
      } else if (this.errorId === URLValidator.ERROR_UNSUPPORTED_CHARACTER) {
        return 'Unsupported character';
      } else if (this.errorId === URLValidator.ERROR_UNSUPPORTED_HOST_CHARACTER) {
        return 'Unsupported character in host';
      } else if (this.errorId === URLValidator.ERROR_UNSUPPORTED_PORT_CHARACTER) {
        return 'Unsupported character in port';
      } else if (this.errorId === URLValidator.ERROR_HOST_MISSING) {
        return 'Domain is missing host';
      } else if (this.errorId === URLValidator.ERROR_HOST_DOUBLE_DOT) {
        return 'Dot cannot be next to another dot in host';
      }

      return _Validator3.default.DEFAULT_ERROR_MESSAGE;
    }
  }]);

  return URLValidator;
}(_Validator3.default);

exports.default = URLValidator;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Validator2 = __webpack_require__(0);

var _Validator3 = _interopRequireDefault(_Validator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IPAddressValidator = function (_Validator) {
  _inherits(IPAddressValidator, _Validator);

  _createClass(IPAddressValidator, null, [{
    key: 'PROTOCOL_SYMBOLS',
    get: function get() {
      return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:/';
    }
  }, {
    key: 'HOST_SYMBOLS',
    get: function get() {
      return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.';
    }
  }, {
    key: 'PORT_SYMBOLS',
    get: function get() {
      return '0123456789';
    }
  }, {
    key: 'STATUS_PROTOCOL',
    get: function get() {
      return 1;
    }
  }, {
    key: 'STATUS_HOST',
    get: function get() {
      return 2;
    }
  }, {
    key: 'STATUS_PORT',
    get: function get() {
      return 4;
    }
  }, {
    key: 'STATUS_PATH',
    get: function get() {
      return 8;
    }
  }, {
    key: 'STATUS_HASH',
    get: function get() {
      return 16;
    }
  }, {
    key: 'STATUS_DONE',
    get: function get() {
      return 32;
    }
  }, {
    key: 'ERROR_UNKNOWN',
    get: function get() {
      return 'ERROR_UNKNOWN';
    }
  }]);

  function IPAddressValidator(input) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, IPAddressValidator);

    var _this = _possibleConstructorReturn(this, (IPAddressValidator.__proto__ || Object.getPrototypeOf(IPAddressValidator)).call(this, input, options));

    _this.status = null;

    _this.validate();
    return _this;
  }

  _createClass(IPAddressValidator, [{
    key: 'prepareInput',
    value: function prepareInput() {
      _get(IPAddressValidator.prototype.__proto__ || Object.getPrototypeOf(IPAddressValidator.prototype), 'prepareInput', this).call(this);

      if (!this.options.required) {
        this.options.required = [];
      }

      this.parsed = {
        protocol: '',
        host: '',
        port: '',
        path: '',
        hash: ''
      };

      // Trim leading spaces
      // Split to array of characters
      return this.input.replace(/(^\s*|\s*$)/, '').split('');
    }
  }, {
    key: 'validate',
    value: function validate() {
      _get(IPAddressValidator.prototype.__proto__ || Object.getPrototypeOf(IPAddressValidator.prototype), 'validate', this).call(this);
      if (!this.valid) {
        return this;
      }

      var input = this.prepareInput();

      this.status = IPAddressValidator.STATUS_HOST;

      input.every(function (char, i) {
        return true;
      });

      return this;
    }
  }, {
    key: 'errorMessage',
    get: function get() {
      if (_get(IPAddressValidator.prototype.__proto__ || Object.getPrototypeOf(IPAddressValidator.prototype), 'errorMessage', this) !== _Validator3.default.DEFAULT_ERROR_MESSAGE) {
        return _get(IPAddressValidator.prototype.__proto__ || Object.getPrototypeOf(IPAddressValidator.prototype), 'errorMessage', this);
      }

      if (this.errorId === IPAddressValidator.ERROR_UNKNOWN_PROTOCOL) {
        return 'Unknown protocol (\'http://\' or \'https://\') is required';
      } else if (this.errorId === IPAddressValidator.ERROR_REQUIRED_PROTOCOL) {
        return 'Protocol (\'http://\' or \'https://\') is required';
      }

      return _Validator3.default.DEFAULT_ERROR_MESSAGE;
    }
  }]);

  return IPAddressValidator;
}(_Validator3.default);

exports.default = IPAddressValidator;

/***/ })
/******/ ]);