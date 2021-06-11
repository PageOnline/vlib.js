
const { Validator } = require('../dist/vlib');

const assert = require('assert');

describe('Validator', () => {
  const emails = {
    valid: [
      ['testing string', { min: 5, max: 15 }],
      ['sjdptorigk', { max: 10 }],
      ['mskrp', { min: 5 }],
    ],
    invalid: [
      ['testing string', { min: 5, max: 6 }],
      ['sjdptorigk', { max: 9 }],
      ['mskrp', { min: 6 }],
    ],
  };

  describe('valid length test', () => {
    emails.valid.forEach((item) => {
      it(`should check valid length for ${item[0]}, ${JSON.stringify(item[1])}`, () => {
        assert(new Validator(item[0], { length: item[1] }).valid);
      });
    });
  });

  describe('invalid length test', () => {
    emails.invalid.forEach((item) => {
      it(`should check invalid length for ${item[0]}, ${JSON.stringify(item[1])}`, () => {
        assert(!new Validator(item[0], { length: item[1] }).valid);
      });
    });
  });
});