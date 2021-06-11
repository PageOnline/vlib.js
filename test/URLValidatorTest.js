
const { URLValidator } = require('../dist/vlib');

const assert = require('assert');

describe('URLValidator', () => {
  const domains = {
    valid: [
      ['google.com', undefined,
        { parsed: { protocol: '', host: 'google.com', port: '', path: '', hash: '' } },
      ],
      ['www.google.com', undefined,
        { parsed: { protocol: '', host: 'www.google.com', port: '', path: '', hash: '' } },
      ],
      ['localhost', undefined,
        { parsed: { protocol: '', host: 'localhost', port: '', path: '', hash: '' } },
      ],
      ['http://google.com', { required: ['protocol'] },
        { parsed: { protocol: 'http', host: 'google.com', port: '', path: '', hash: '' } },
      ],
      ['http://www.google.com', undefined,
        { parsed: { protocol: 'http', host: 'www.google.com', port: '', path: '', hash: '' } },
      ],
      ['http://www.google.com/fonts', undefined,
        { parsed: { protocol: 'http', host: 'www.google.com', port: '', path: '/fonts', hash: '' } },
      ],
      ['https://www.google.com:80/fonts', undefined,
        { parsed: { protocol: 'https', host: 'www.google.com', port: '80', path: '/fonts', hash: '' } },
      ],
      ['http://www.google.com/fonts/helvetica/neue', undefined,
        { parsed: { protocol: 'http', host: 'www.google.com', port: '', path: '/fonts/helvetica/neue', hash: '' } },
      ],
      ['https://www.google.com/fonts#helvetica', undefined,
        { parsed: { protocol: 'https', host: 'www.google.com', port: '', path: '/fonts', hash: '#helvetica' } },
      ],
      ['https://www.google.com:80/fonts#helvetica', { required: ['protocol', 'secured', 'www', 'path', 'hash', 'port'] },
        { parsed: { protocol: 'https', host: 'www.google.com', port: '80', path: '/fonts', hash: '#helvetica' } },
      ],
    ],
    invalid: [
        ['hrps://google', undefined],
        ['google.com', { required: ['protocol'] }],
        ['www.google.com:80/fonts#helvetica', { required: ['protocol'] } ],
        ['www.google.com:80/fonts#helvetica', { required: ['secured'] } ],
        ['http://www.google.com:80/fonts#helvetica', { required: ['secured'] } ],
        ['https://www.google.com', { required: ['port'] } ],
        ['https://www.google.com/fonts#helvetica', { required: ['port'] } ],
        ['https://www.google.com:80', { required: ['path'] } ],
        ['https://www.google.com:80#helvetica', { required: ['path'] } ],
        ['https://www.google.com:80/fonts', { required: ['hash'] } ],
        ['https://', undefined],
        ['www.google.com:39s', undefined],
    ],
  };

  describe('valid domains test', () => {
    domains.valid.forEach((item) => {
      it(`should check valid domain ${item[0]} ${item[1] ? JSON.stringify(item[1]) : ''}`, () => {
        const validator = new URLValidator(item[0], item[1]);
        assert(validator.valid);
        assert.deepEqual(validator.parsed, item[2].parsed);
      });
    });
  });

  describe('invalid domains test', () => {
    domains.invalid.forEach((item) => {
      it(`should check invalid domain ${item[0]} ${item[1] ? JSON.stringify(item) : ''}`, () => {
        assert(!new URLValidator(item[0], item[1]).valid);
      });
    });
  });
});
