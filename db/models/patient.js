const Sequelize = require('sequelize')
const db = require('../db')
const bcrypt = require('bcrypt')

const Patient = db.define('patient', {
  first_name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  last_name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  DOB: Sequelize.DATEONLY,
  gender: {
    type: Sequelize.ENUM,
    values: ['M','F']
  },
  img_URL: Sequelize.STRING,
  password_digest: Sequelize.STRING,
  password: Sequelize.VIRTUAL
}, {
  underscored: true,
  hooks: {
    beforeCreate: setEmailAndPassword,  // ensure email is lower-case, create password, and digest
    afterUpdate: setEmailAndPassword
  },
  instanceMethods: {
    authenticate(plaintext) {    // authenticate method for login
      return new Promise((resolve, reject) =>
        bcrypt.compare(plaintext, this.password_digest,
          (err, result) =>
            err ? reject(err) : resolve(result))
        )
    }
  }
})

// utility function to set email to lower case and hash the password
function setEmailAndPassword(patient) {
  patient.email = patient.email && patient.email.toLowerCase()
  if (!patient.password) patient.password = randAlpha(6)

  return new Promise((resolve, reject) =>
    bcrypt.hash(patient.get('password'), 10, (err, hash) => {
      if (err) reject(err)
      patient.set('password_digest', hash)
      resolve(patient)
    })
  )
}

function randAlpha(num) {
  let rand = '', idx=0, chars = 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789'

  while (++idx < num) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return rand
}

module.exports = Patient
