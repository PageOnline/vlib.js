
import Validator from './Validator';
import URLValidator from './URLValidator';
import IPAddressValidator from './IPAddressValidator';

export default class EmailValidator extends Validator {

  static get USERNAME_SYMBOLS() { return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!$&*-=\\^`|~#%‘+/?_{}/'; }
  static get USERNAME_SPECIAL_SYMBOLS() { return '"().,:;<>@[\\]'; }

  static get STATUS_USERNAME() { return 1; }
  static get STATUS_USERNAME_STRING() { return 2; }
  static get STATUS_USERNAME_SUFFIX() { return 4; }
  static get STATUS_USERNAME_SUFFIX_STRING() { return 8; }
  static get STATUS_DOMAIN() { return 16; }
  static get STATUS_DONE() { return 32; }

  static get ERROR_FIRST_SYMBOL_IS_AT() { return 'ERROR_FIRST_SYMBOL_IS_AT'; }
  static get ERROR_DOUBLE_AT() { return 'ERROR_DOUBLE_AT'; }
  static get ERROR_USERNAME_EXCEEDES_64_CHARS() { return 'ERROR_USERNAME_EXCEEDES_64_CHARS'; }
  static get ERROR_USERNAME_FIRST_SYMBOL_IS_DOT() { return 'ERROR_USERNAME_FIRST_SYMBOL_IS_DOT'; }
  static get ERROR_USERNAME_LAST_SYMBOL_IS_DOT() { return 'ERROR_USERNAME_LAST_SYMBOL_IS_DOT'; }
  static get ERROR_USERNAME_DOUBLE_DOT() { return 'ERROR_USERNAME_DOUBLE_DOT'; }
  static get ERROR_UNSUPPORTED_CHARACTER() { return 'ERROR_UNSUPPORTED_CHARACTER'; }
  static get ERROR_UNCLOSED_QUOTES() { return 'ERROR_UNCLOSED_QUOTES'; }

  static get ERROR_DOMAIN_IS_MISSING() { return 'ERROR_DOMAIN_IS_MISSING'; }

  constructor(input, options = {}) {
    super(input, options);

    // Prevent addresses longer than 254 characters
    this.options.length = this.options.length || {};
    this.options.length.max = this.options.length.max || 254;

    this.status = null;

    this.hostValidator = null;

    this.validate();
  }

  get errorMessage() {
    if (super.errorMessage !== Validator.DEFAULT_ERROR_MESSAGE) {
      return super.errorMessage;
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

    return Validator.DEFAULT_ERROR_MESSAGE;
  }

  prepareInput() {
    super.prepareInput();

    this.parsed = {
      local: '',
      local_suffix: '',
      host: '',
    };

    // Trim leading spaces
    // Split to array of characters
    return this.input
      .replace(/(^\s*|\s*$)/, '')
      .split('');
  }

  validate() {
    super.validate();
    if (!this.valid) {
      return this;
    }

    const input = this.prepareInput();

    // Initial status
    this.status = EmailValidator.STATUS_USERNAME;

    input.every((char, i) => {
      if (
        this.status & EmailValidator.STATUS_USERNAME ||
        this.status & EmailValidator.STATUS_USERNAME_SUFFIX
      ) {
        if (EmailValidator.USERNAME_SYMBOLS.indexOf(input[i]) !== -1) {
          if (input[i] === '+') {
            this.status = EmailValidator.STATUS_USERNAME_SUFFIX;
          } else {
            this.parsed[this.status & EmailValidator.STATUS_USERNAME ? 'local' : 'local_suffix'] += input[i];
          }
        } else if (input[i] === '@') {
          if (i === 0) {
            return this.error(EmailValidator.ERROR_FIRST_SYMBOL_IS_AT);
          }

          if (`${this.parsed.local}+${this.parsed.local_suffix}`.length > 64) {
            return this.error(EmailValidator.ERROR_USERNAME_EXCEEDES_64_CHARS);
          }

          this.status = EmailValidator.STATUS_DOMAIN;
        } else if (EmailValidator.USERNAME_SPECIAL_SYMBOLS.indexOf(input[i]) !== -1) {
          if (input[i] === '.') {
            // Check if dot is first
            if (i === 0) {
              return this.error(EmailValidator.ERROR_USERNAME_FIRST_SYMBOL_IS_DOT);
            }

            // Check if dot is last
            if (input[i + 1] === '@') {
              return this.error(EmailValidator.ERROR_USERNAME_LAST_SYMBOL_IS_DOT);
            }

            // Double dot check
            if (input[i - 1] === '.') {
              return this.error(EmailValidator.ERROR_USERNAME_DOUBLE_DOT);
            }

            this.parsed[this.status & EmailValidator.STATUS_USERNAME ? 'local' : 'local_suffix'] += '.';
          } else if (input[i] === '"') {
            this.parsed[this.status & EmailValidator.STATUS_USERNAME ? 'local' : 'local_suffix'] += '"';
            this.status = EmailValidator.STATUS_USERNAME_STRING;
          } else {
            // TODO: add more special character restrictions
          }
        }
      } else if (
        this.status & EmailValidator.STATUS_USERNAME_STRING ||
        this.status & EmailValidator.STATUS_USERNAME_SUFFIX_STRING
      ) {
        this.parsed[this.status & EmailValidator.STATUS_USERNAME_STRING ? 'local' : 'local_suffix'] += input[i];

        if (input[i] === '"' && input[i - 1] !== '\\') {
          this.status = (
            this.status & EmailValidator.STATUS_USERNAME_STRING ?
            EmailValidator.STATUS_USERNAME : EmailValidator.STATUS_USERNAME_SUFFIX
          );
        }
      } else if (this.status & EmailValidator.STATUS_DOMAIN) {
        if (input[i] === '@') {
          return this.error(EmailValidator.ERROR_DOUBLE_AT);
        }

        this.parsed.host += input[i];
      } else {
        return this.error(EmailValidator.ERROR_UNSUPPORTED_CHARACTER);
      }

      return true;
    });

    if (this.errorId) {
      return this;
    }

    if (
      this.status === EmailValidator.STATUS_USERNAME_STRING ||
      this.status === EmailValidator.STATUS_USERNAME_SUFFIX_STRING
    ) {
      this.error(EmailValidator.ERROR_UNCLOSED_QUOTES);
      return this;
    } else if (this.status !== EmailValidator.STATUS_DOMAIN) {
      this.error(EmailValidator.ERROR_DOMAIN_IS_MISSING);
      return this;
    }

    if (
      this.parsed.host[0] === '[' &&
      this.parsed.host[this.parsed.host.length - 1] === ']'
    ) {
      const host = this.parsed.host.slice(1, this.parsed.host.length - 1);
      this.hostValidator = new IPAddressValidator(host);
      if (!this.hostValidator.valid) {
        this.error(this.hostValidator.errorId);
      }
    } else {
      this.hostValidator = new URLValidator(this.parsed.host);
      if (!this.hostValidator.valid) {
        this.error(this.hostValidator.errorId);
      }
    }

    return this;
  }
}
