'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Credit to: http://stackoverflow.com/a/32749533/2487701

var ExtendableError = function (_Error) {
  _inherits(ExtendableError, _Error);

  function ExtendableError(message) {
    _classCallCheck(this, ExtendableError);

    var _this = _possibleConstructorReturn(this, (ExtendableError.__proto__ || Object.getPrototypeOf(ExtendableError)).call(this, message));

    _this.name = _this.constructor.name;
    _this.message = message;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_this, _this.constructor);
    } else {
      _this.stack = new Error(message).stack;
    }
    return _this;
  }

  return ExtendableError;
}(Error);

var MyError = function (_ExtendableError) {
  _inherits(MyError, _ExtendableError);

  function MyError(m) {
    _classCallCheck(this, MyError);

    return _possibleConstructorReturn(this, (MyError.__proto__ || Object.getPrototypeOf(MyError)).call(this, m));
  }

  return MyError;
}(ExtendableError);
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidatorResult = function ValidatorResult() {
  _classCallCheck(this, ValidatorResult);
};

var Validator = function Validator(input) {
  _classCallCheck(this, Validator);

  if (typeof input === 'undefined') throw ReferenceError('Validator');
};
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhoneNumberValidator = function (_Validator) {
  _inherits(PhoneNumberValidator, _Validator);

  function PhoneNumberValidator(input) {
    _classCallCheck(this, PhoneNumberValidator);

    var _this = _possibleConstructorReturn(this, (PhoneNumberValidator.__proto__ || Object.getPrototypeOf(PhoneNumberValidator)).call(this, input));

    if (!input) throw new ReferenceError('input is not defined');

    if (!input || typeof input !== 'string') throw new Error('Input cannot be');

    return _this;
  }

  return PhoneNumberValidator;
}(Validator);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmailValidator = function (_Validator) {
  _inherits(EmailValidator, _Validator);

  _createClass(EmailValidator, [{
    key: 'error',
    value: function error(message) {

      this.valid = false;

      this.username = '';
      this.username_suffix = '';
      this.domain = '';

      this.message = message;

      return this;
    }
  }]);

  function EmailValidator(input) {
    var _ret9;

    _classCallCheck(this, EmailValidator);

    // Writting input as class property
    var _this = _possibleConstructorReturn(this, (EmailValidator.__proto__ || Object.getPrototypeOf(EmailValidator)).call(this, input));

    _this.USERNAME_SYMBOLS = 'abcdefghijklmnopqtuvwxyzABCDEFGHIJKLMNOPQTUVWXYZ0123456789!$&*-=\\^`|~#%‘+/?_{}/';
    _this.USERNAME_SPECIAL_SYMBOLS = '"(),:;<>@[\\]';
    _this.STATUS_USERNAME = 0;
    _this.STATUS_USERNAME_STRING = 1;
    _this.STATUS_USERNAME_SUFFIX = 2;
    _this.STATUS_USERNAME_SUFFIX_STRING = 3;
    _this.STATUS_DOMAIN = 4;
    _this.STATUS_DONE = 5;
    _this.status = null;
    _this.message = '';
    _this.input = '';
    _this.valid = false;
    _this.username = '';
    _this.username_suffix = '';
    _this.domain = '';
    _this.input = input;

    // Trim leading spaces
    _this.input = _this.input.replace(/(^\s*|\s*$)/, '');

    // Initial status
    _this.status = _this.STATUS_USERNAME;

    for (var i = 0; i < _this.input.length; ++i) {

      if (_this.status === _this.STATUS_USERNAME || _this.status == _this.STATUS_USERNAME_SUFFIX) {

        if (_this.USERNAME_SYMBOLS.indexOf(_this.input[i]) !== -1) {

          if (_this.input[i] === '+') _this.status = _this.STATUS_USERNAME_SUFFIX;else _this[_this.status === _this.STATUS_USERNAME ? 'username' : 'username_suffix'] += _this.input[i];
        } else if (_this.input[i] === '@') {
          var _ret;

          if (i === 0) return _ret = _this.error('@ cannot be the first symbol of email address'), _possibleConstructorReturn(_this, _ret);else _this.status = _this.STATUS_DOMAIN;
        } else if (_this.USERNAME_SPECIAL_SYMBOLS.indexOf(_this.input[i]) !== -1) {

          if (_this.input[i] === '.') {
            var _ret2, _ret3, _ret4;

            // Check if dot is first
            if (i === 0) return _ret2 = _this.error('Dot cannot be first username character'), _possibleConstructorReturn(_this, _ret2);

            // Check if dot is last
            if (_this.input[i + 1] === '@') return _ret3 = _this.error('Dot cannot be last username character'), _possibleConstructorReturn(_this, _ret3);

            // Double dot check
            if (_this.input[i - 1] === '.') return _ret4 = _this.error('Dot cannot be next to another dot'), _possibleConstructorReturn(_this, _ret4);
          } else if (_this.input[i] === '"') {

            _this[_this.status === _this.STATUS_USERNAME ? 'username' : 'username_suffix'] += '"';

            _this.status = _this.STATUS_USERNAME_STRING;
          } else {

            // TODO: add more special character restrictions

          }
        }
      } else if (_this.status === _this.STATUS_USERNAME_STRING || _this.status === _this.STATUS_USERNAME_SUFFIX_STRING) {

        _this[_this.status === _this.STATUS_USERNAME_STRING ? 'username' : 'username_suffix'] += _this.input[i];

        if (_this.input[i] === '"') if (_this.input[i - 1] !== '\\') _this.status = _this.status === _this.STATUS_USERNAME_STRING ? _this.STATUS_USERNAME : _this.STATUS_USERNAME_SUFFIX;
      } else if (_this.status === _this.STATUS_DOMAIN) {
        var _ret5;

        if (_this.input[i] === '@') return _ret5 = _this.error('Domain cannot contain @ symbol'), _possibleConstructorReturn(_this, _ret5);

        if (_this.input[i] === '.') {
          var _ret6, _ret7, _ret8;

          // Check if dot is first
          if (i === 0) return _ret6 = _this.error('Dot cannot be first username character'), _possibleConstructorReturn(_this, _ret6);

          // Check if dot is last
          if (_this.input[i + 1] === '@') return _ret7 = _this.error('Dot cannot be last username character'), _possibleConstructorReturn(_this, _ret7);

          // Double dot check
          if (_this.input[i - 1] === '.') return _ret8 = _this.error('Dot cannot be next to another dot'), _possibleConstructorReturn(_this, _ret8);
        }

        _this.domain += _this.input[i];

        // TODO: Domain part
      }
    }

    if (_this.status === _this.STATUS_DOMAIN) _this.valid = true;else _this.valid = false;

    return _ret9 = _this, _possibleConstructorReturn(_this, _ret9);
  }

  return EmailValidator;
}(Validator);
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var vlib = function vlib() {
  _classCallCheck(this, vlib);

  this.email = function (email) {
    return new EmailValidator(email);
  };

  this.phoneNumber = function (phoneNumber) {
    return new PhoneNumberValidator(phoneNumber);
  };
};

var v = new vlib();

var emails = {
  valid: ['ondrejpagebarta@gmail.com', 'ondrejpageb"boo"arta+asdnfio@gmail.com', 'user@[IPv6:2001:db8::1]', '"very.unusual.@.unusual.com"@example.com', '"very.(),:;<>[]\".VERY.\"very@\ \"very\".unusual"@strange.example.com', 'example@s.solutions', 'x@example.com', 'very.common@example.com', '" "@example.org'],
  invalid: ['this\ still\"not\allowed@example.com', 'A@b@c@example.com', 'john..doe@example.com', 'john.doe@example..com', 'a"b(c)d,e:f;gi[j\k]l@example.com', 'user@[IPv6:2001:db8::1', 'user@[IPv6:2001']
};

console.log('');
console.log('Sould be valid');
for (var i = 0; i < emails.valid.length; ++i) {
  console.log('email "' + emails.valid[i] + '" => ' + (v.email(emails.valid[i]).valid ? 'valid' : 'invalid'), v.email(emails.valid[i]));
}console.log('');
console.log('Should be invalid');
for (var i = 0; i < emails.invalid.length; ++i) {
  console.log('email "' + emails.invalid[i] + '" => ' + (v.email(emails.invalid[i]).valid ? 'valid' : 'invalid'), v.email(emails.invalid[i]));
}console.log('');
console.log(Validator.constructor);

//# sourceMappingURL=vlib.js.map