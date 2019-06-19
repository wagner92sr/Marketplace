const Maill = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'PurchaseMail'
  }

  async handle (job, done) {
    const { ad, user, content } = job.data

    await Maill.sendMail({
      from: '"Wagner Rodrigues" <wagnerApiNode@rocketseat.com.br>',
      to: ad.author.email,
      subject: `Solicitação de compra ${ad.title}`,
      template: 'purchase',
      context: { user, content, ad }
    })
    return done()
  }
}

module.exports = new PurchaseMail()
