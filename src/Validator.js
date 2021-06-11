
export default class Validator {

  static get STATUS_NONE() { return 0; }

  static get ERROR_LENGTH_MAX() { return 'ERROR_LENGTH_MAX'; }
  static get ERROR_LENGTH_MIN() { return 'ERROR_LENGTH_MIN'; }

  static get DEFAULT_ERROR_MESSAGE() { return 'Undefined error'; }

  constructor(input, options = {}) {
    if (typeof input === 'undefined') {
      throw ReferenceError('\'input\' is not defined');
    }

    if (typeof options === 'undefined') {
      throw ReferenceError('\'options\' is not defined');
    } else if (typeof options !== 'object') {
      throw TypeError('\'options\' should be of type of object');
    }

    this.errorId = null;

    this.valid = true;

    this.input = input;
    this.options = options;

    this.parsed = null;

    this.validate();
  }

  error(errorId) {
    this.valid = false;
    this.errorId = errorId;
    return false;
  }

  get errorMessage() {
    if (this.errorId === Validator.ERROR_LENGTH_MIN) {
      return `Input must not have less than ${this.options.length.min} characters`;
    } else if (this.errorId === Validator.ERROR_LENGTH_MAX) {
      return `Input must not have more than ${this.options.length.max} characters`;
    }

    return Validator.DEFAULT_ERROR_MESSAGE;
  }

  prepareInput() {
    return this.input;
  }

  validate() {
    const input = this.prepareInput();

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

}
