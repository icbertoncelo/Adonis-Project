'use strict'

const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()

      await Mail.send(
        ['emails.forgot_password'],
        {
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`
        },
        message => {
          message
            .to(user.email)
            .from('carlos.ian007@gmail.com', 'Ian | UENF')
            .subject('Recuperação de senha')
        }
      )
    } catch (err) {
      response.status(err.status).send({
        error: { message: 'Something is wrong. Does this email exist?' }
      })
    }
  }
}

module.exports = ForgotPasswordController
