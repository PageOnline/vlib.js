class vlib {

  constructor() {}

  email = (email) => new EmailValidator(email)

  phoneNumber = (phoneNumber) => new PhoneNumberValidator(phoneNumber)



}

var v = new vlib()

var emails = {
  valid: [
    'ondrejpagebarta@gmail.com',
    'ondrejpageb"boo"arta+asdnfio@gmail.com',
    'user@[IPv6:2001:db8::1]',
    '"very.unusual.@.unusual.com"@example.com',
    '"very.(),:;<>[]\".VERY.\"very@\ \"very\".unusual"@strange.example.com',
    'example@s.solutions',
    'x@example.com',
    'very.common@example.com',
    '" "@example.org'
  ],
  invalid: [
    'this\ still\"not\allowed@example.com',
    'A@b@c@example.com',
    'john..doe@example.com',
    'john.doe@example..com',
    'a"b(c)d,e:f;gi[j\k]l@example.com',
    'user@[IPv6:2001:db8::1',
    'user@[IPv6:2001'
  ]
}

console.log('')
console.log('Sould be valid')
for(var i = 0; i < emails.valid.length; ++i)
  console.log(`email "${ emails.valid[i] }" => ${ v.email(emails.valid[i]).valid ? 'valid' : 'invalid' }`, v.email(emails.valid[i]))

console.log('')
console.log('Should be invalid')
for(var i = 0; i < emails.invalid.length; ++i)
  console.log(`email "${ emails.invalid[i] }" => ${ v.email(emails.invalid[i]).valid ? 'valid' : 'invalid' }`, v.email(emails.invalid[i]))

console.log('')
console.log(Validator.constructor)
