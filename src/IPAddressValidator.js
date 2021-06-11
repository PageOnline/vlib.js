
import Validator from './Validator';

export default class IPAddressValidator extends Validator {

  static get PROTOCOL_SYMBOLS() { return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:/'; }
  static get HOST_SYMBOLS() { return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.'; }
  static get PORT_SYMBOLS() { return '0123456789'; }

  static get STATUS_PROTOCOL() { return 1; }
  static get STATUS_HOST() { return 2; }
  static get STATUS_PORT() { return 4; }
  static get STATUS_PATH() { return 8; }
  static get STATUS_HASH() { return 16; }
  static get STATUS_DONE() { return 32; }

  static get ERROR_UNKNOWN() { return 'ERROR_UNKNOWN'; }

  constructor(input, options = {}) {
    super(input, options);

    this.status = null;

    this.validate();
  }

  get errorMessage() {
    if (super.errorMessage !== Validator.DEFAULT_ERROR_MESSAGE) {
      return super.errorMessage;
    }

    if (this.errorId === IPAddressValidator.ERROR_UNKNOWN_PROTOCOL) {
      return 'Unknown protocol (\'http://\' or \'https://\') is required';
    } else if (this.errorId === IPAddressValidator.ERROR_REQUIRED_PROTOCOL) {
      return 'Protocol (\'http://\' or \'https://\') is required';
    }

    return Validator.DEFAULT_ERROR_MESSAGE;
  }

  prepareInput() {
    super.prepareInput();

    if (!this.options.required) {
      this.options.required = [];
    }

    this.parsed = {
      protocol: '',
      host: '',
      port: '',
      path: '',
      hash: '',
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

    this.status = IPAddressValidator.STATUS_HOST;

    input.every((char, i) => {
      return true;
    });

    return this;
  }

}
