
import Validator from './Validator';

export default class URLValidator extends Validator {

  static get PROTOCOL_SYMBOLS() { return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:/'; }
  static get HOST_SYMBOLS() { return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.'; }
  static get PORT_SYMBOLS() { return '0123456789'; }

  static get STATUS_PROTOCOL() { return 1; }
  static get STATUS_HOST() { return 2; }
  static get STATUS_PORT() { return 4; }
  static get STATUS_PATH() { return 8; }
  static get STATUS_HASH() { return 16; }
  static get STATUS_DONE() { return 32; }

  static get ERROR_UNKNOWN_PROTOCOL() { return 'ERROR_UNKNOWN_PROTOCOL'; }
  static get ERROR_REQUIRED_PROTOCOL() { return 'ERROR_REQUIRED_PROTOCOL'; }
  static get ERROR_REQUIRED_SECURED_PROTOCOL() { return 'ERROR_REQUIRED_SECURED_PROTOCOL'; }
  static get ERROR_REQUIRED_INSECURED_PROTOCOL() { return 'ERROR_REQUIRED_INSECURED_PROTOCOL'; }
  static get ERROR_REQUIRED_PORT() { return 'ERROR_REQUIRED_PORT'; }
  static get ERROR_REQUIRED_PATH() { return 'ERROR_REQUIRED_PATH'; }
  static get ERROR_REQUIRED_HASH() { return 'ERROR_REQUIRED_HASH'; }
  static get ERROR_UNSUPPORTED_CHARACTER() { return 'ERROR_UNSUPPORTED_CHARACTER'; }
  static get ERROR_UNSUPPORTED_HOST_CHARACTER() { return 'ERROR_UNSUPPORTED_HOST_CHARACTER'; }
  static get ERROR_UNSUPPORTED_PORT_CHARACTER() { return 'ERROR_UNSUPPORTED_PORT_CHARACTER'; }
  static get ERROR_HOST_MISSING() { return 'ERROR_HOST_MISSING'; }
  static get ERROR_HOST_DOUBLE_DOT() { return 'ERROR_HOST_DOUBLE_DOT'; }

  constructor(input, options = {}) {
    super(input, options);

    this.status = null;

    this.validate();
  }

  get errorMessage() {
    if (super.errorMessage !== Validator.DEFAULT_ERROR_MESSAGE) {
      return super.errorMessage;
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

    const portRegexp = /^[a-zA-Z]+:\/\//;

    this.status = portRegexp.test(this.input) ?
      URLValidator.STATUS_PROTOCOL :
      URLValidator.STATUS_HOST;

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

    input.every((char, i) => {
      // Protocol & Host
      if (this.status === URLValidator.STATUS_PROTOCOL) {
        if (input[i] === '/' && i > 1 && input[i - 1] === '/' && input[i - 2] === ':') {
          this.parsed.protocol = this.parsed.protocol.replace(':/', '');

          this.secured = this.parsed.protocol === 'https';

          if (this.parsed.protocol === 'https') {
            if (this.options.required.indexOf('insecured') !== -1) {
              return this.error(URLValidator.ERROR_REQUIRED_INSECURED_PROTOCOL);
            }
          } else if (this.parsed.protocol === 'http') {
            if (this.options.required.indexOf('secured') !== -1) {
              return this.error(URLValidator.ERROR_REQUIRED_SECURED_PROTOCOL);
            }
          } else {
            return this.error(URLValidator.ERROR_UNKNOWN_PROTOCOL);
          }

          this.status = URLValidator.STATUS_HOST;
          return true;
        }

        this.parsed.protocol += input[i];
      }

      // Host
      if (this.status === URLValidator.STATUS_HOST) {
        if (input[i] === ':') {
          this.status = URLValidator.STATUS_PORT;
          return true;
        } else if (input[i] === '/') {
          if (this.options.required.indexOf('port') !== -1) {
            return this.error(URLValidator.ERROR_REQUIRED_PORT);
          }

          this.status = URLValidator.STATUS_PATH;
        } else if (input[i] === '#') {
          if (this.options.required.indexOf('port') !== -1) {
            return this.error(URLValidator.ERROR_REQUIRED_PORT);
          }

          if (this.options.required.indexOf('path') !== -1) {
            return this.error(URLValidator.ERROR_REQUIRED_PATH);
          }

          this.status = URLValidator.STATUS_HASH;
          return true;
        } else if (URLValidator.HOST_SYMBOLS.indexOf(input[i]) !== -1) {
          this.parsed.host += input[i];
        } else {
          return this.error(URLValidator.ERROR_UNSUPPORTED_HOST_CHARACTER);
        }
      }

      // Port
      if (this.status === URLValidator.STATUS_PORT) {
        if (input[i] === '/') {
          this.status = URLValidator.STATUS_PATH;
        } else if (URLValidator.PORT_SYMBOLS.indexOf(input[i]) !== -1) {
          this.parsed.port += input[i];
        } else {
          return this.error(URLValidator.ERROR_UNSUPPORTED_PORT_CHARACTER);
        }
      }

      // Path
      if (this.status === URLValidator.STATUS_PATH) {
        if (input[i] === '#') {
          if (
            this.parsed.path === '/' &&
            this.options.required.indexOf('path') !== -1
          ) {
            return this.error(URLValidator.ERROR_REQUIRED_PATH);
          }

          this.status = URLValidator.STATUS_HASH;
        } else {
          this.parsed.path += input[i];
        }
      }

      // Hash
      if (this.status === URLValidator.STATUS_HASH) {
        this.parsed.hash += input[i];
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

}
