class PhoneNumberValidator extends Validator {

  constructor(input) {

    super(input)

    if(!input) throw new ReferenceError('input is not defined')

    if(!input || typeof input !== 'string') throw new Error('Input cannot be')

  }

}
