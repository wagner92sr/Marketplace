const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

/* abaixo: hook para disparar ação antes de salvar ("trigger ?")
criptografar senha. Nao usa arrow function */
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 8)
})

UserSchema.methods = {
  // declaracao dos metodos de instancia
  comparePassword (password) {
    return bcrypt.compare(password, this.password)
  }
}

UserSchema.statics = {
  generateToken ({ id }) {
    return jwt.sign({ id }, 'GoNode3', {
      expiresIn: 86400
    })
  }
}

module.exports = mongoose.model('User', UserSchema)
