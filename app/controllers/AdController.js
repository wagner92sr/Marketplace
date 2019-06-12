const Ad = require('../models/Ad')

class AdController {
  async index (req, res) {
    const ads = await Ad.paginate(
      {}, // no primeiro objeto passado p/ paginate informo os filtros. ex: price: 2000
      {
        page: req.query.page || 1, // verifica se existe query param, default 1
        limit: 20, // registros por pagina
        populate: ['author'], // faz um join com os dados do autor pra retornar na pesquisa
        sort: '-createdAt' // o '-' indica que é do menor pro maior
      }
    )

    return res.json(ads)
  }

  async show (req, res) {
    const ad = await Ad.findById(req.params.id)

    return res.json(ad)
  }

  async store (req, res) {
    const ad = await Ad.create({ ...req.body, author: req.userId })

    return res.json(ad)
  }

  async update (req, res) {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(ad)
  }

  async destroy (req, res) {
    await Ad.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new AdController()
