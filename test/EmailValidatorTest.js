
const { EmailValidator, URLValidator } = require('../dist/vlib');

const assert = require('assert');

describe('EmailValidator', () => {
  const emails = {
    valid: [
      'prettyandsimple@example.com',
      'very.common@example.com',
      'disposable.style.email.with+symbol@example.com',
      'other.email-with-dash@example.com',
      'fully-qualified-domain@example.com.',
      'x@example.com',
      '"very.unusual.@.unusual.com"@example.com',
      '"very.(),:;<>[]\\".VERY.\\"very@\\ \\"very\\".unusual"@strange.example.com',
      'example-indeed@strange-example.com',
      'admin@mailserver1',
      '#!$%&\'*+-/=?^_`{}|~@example.org',
      '"()<>[]:,;@\\\"!#$%&\'-/=?^_`{}| ~.a"@example.org',
      '" "@example.org',
      'example@s.solutions',
      'user@localserver',
      'user@[IPv6:2001:DB8::1]',
    ],
    invalid: [
      ['Abc.example.com', EmailValidator.ERROR_DOMAIN_IS_MISSING],
      ['A@b@c@example.com', EmailValidator.ERROR_DOUBLE_AT],
      ['a"b(c)d,e:f;g<h>i[j\\k]l@example.com', EmailValidator.ERROR_UNCLOSED_QUOTES],
      // TODO: ['just"not"right@example.com'],
      // TODO: I do not know what is wrong with this email address
      ['this is"not\\allowed@example.com', EmailValidator.ERROR_UNCLOSED_QUOTES],
      ['this\\ still\\"not\\\\allowed@example.com', EmailValidator.ERROR_UNCLOSED_QUOTES],
      ['1234567890123456789012345678901234567890123456789012345678901234+x@example.com', EmailValidator.ERROR_USERNAME_EXCEEDES_64_CHARS],
      ['john..doe@example.com', EmailValidator.ERROR_USERNAME_DOUBLE_DOT],
      // TODO: ['example@localhost'],
      ['john.doe@example..com', URLValidator.ERROR_HOST_DOUBLE_DOT],
      ['user@[IPv6:2001:DB8::1', URLValidator.ERROR_HOST_MISSING],
    ],
  };

  describe('valid emails test', () => {
    emails.valid.forEach((item) => {
      it(`should check valid email address ${item}`, () => {
        const validator = new EmailValidator(item);
        assert(validator.valid, validator.errorMessage);
      });
    });
  });

  describe('invalid emails test', () => {
    emails.invalid.forEach((item) => {
      it(`should check invalid email address ${item[0]}`, () => {
        const validator = new EmailValidator(item[0]);
        assert(!validator.valid, validator.errorId);
        assert(item[1] === validator.errorId, validator.errorId);
      });
    });
  });
});
