class EmailValidator extends Validator {

  USERNAME_SYMBOLS = 'abcdefghijklmnopqtuvwxyzABCDEFGHIJKLMNOPQTUVWXYZ0123456789!$&*-=\\^`|~#%‘+/?_{}/'
  USERNAME_SPECIAL_SYMBOLS = '"(),:;<>@[\\]'

  STATUS_USERNAME = 0
  STATUS_USERNAME_STRING = 1
  STATUS_USERNAME_SUFFIX = 2
  STATUS_USERNAME_SUFFIX_STRING = 3
  STATUS_DOMAIN = 4
  STATUS_DONE = 5

  status = null

  message = ''

  input = ''
  valid = false

  username = ''
  username_suffix = ''
  domain = ''

  error(message) {

    this.valid = false

    this.username = ''
    this.username_suffix = ''
    this.domain = ''

    this.message = message

    return this
  }

  constructor(input) {
    super(input)

    // Writting input as class property
    this.input = input

    // Trim leading spaces
    this.input = this.input.replace(/(^\s*|\s*$)/, '')

    // Initial status
    this.status = this.STATUS_USERNAME

    for(let i = 0; i < this.input.length; ++i) {



      if(this.status === this.STATUS_USERNAME || this.status == this.STATUS_USERNAME_SUFFIX) {

        if(this.USERNAME_SYMBOLS.indexOf(this.input[i]) !== -1) {

          if(this.input[i] === '+')
            this.status = this.STATUS_USERNAME_SUFFIX

          else
            this[this.status === this.STATUS_USERNAME ? 'username' : 'username_suffix'] += this.input[i]


        } else if(this.input[i] === '@') {

          if(i === 0)
            return this.error('@ cannot be the first symbol of email address')

          else
            this.status = this.STATUS_DOMAIN


        } else if(this.USERNAME_SPECIAL_SYMBOLS.indexOf(this.input[i]) !== -1) {

          if(this.input[i] === '.') {

            // Check if dot is first
            if(i === 0)
              return this.error('Dot cannot be first username character')

            // Check if dot is last
            if(this.input[i + 1] === '@')
              return this.error('Dot cannot be last username character')

            // Double dot check
            if(this.input[i - 1] === '.')
              return this.error('Dot cannot be next to another dot')

          } else if(this.input[i] === '"') {

            this[this.status === this.STATUS_USERNAME ? 'username': 'username_suffix'] += '"'

            this.status = this.STATUS_USERNAME_STRING

          } else {

            // TODO: add more special character restrictions

          }


        }



      } else if(this.status === this.STATUS_USERNAME_STRING || this.status === this.STATUS_USERNAME_SUFFIX_STRING) {

        this[this.status === this.STATUS_USERNAME_STRING ? 'username' : 'username_suffix'] += this.input[i]

        if(this.input[i] === '"')
          if(this.input[i - 1] !== '\\')
            this.status = (this.status === this.STATUS_USERNAME_STRING ? this.STATUS_USERNAME : this.STATUS_USERNAME_SUFFIX)



      } else if(this.status === this.STATUS_DOMAIN) {

        if(this.input[i] === '@')
          return this.error('Domain cannot contain @ symbol')

        if(this.input[i] === '.') {

          // Check if dot is first
          if(i === 0)
            return this.error('Dot cannot be first username character')

          // Check if dot is last
          if(this.input[i + 1] === '@')
            return this.error('Dot cannot be last username character')

          // Double dot check
          if(this.input[i - 1] === '.')
            return this.error('Dot cannot be next to another dot')

        } 

        this.domain += this.input[i]

        // TODO: Domain part

      }



    }

    if(this.status === this.STATUS_DOMAIN)
      this.valid = true
    else
      this.valid = false

    return this

  }

}
