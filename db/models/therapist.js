const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const db = require('../db')

// Each therapist requires a first name, last name, email, and password
const Therapist = db.define('therapist', {
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
  practice_name: Sequelize.STRING,
  license_id: Sequelize.STRING,
  img_URL : {
    type: Sequelize.STRING,
    defaultValue:"https://lh3.googleusercontent.com/-3XEatggPXpI/AAAAAAAAAAI/AAAAAAAAAAA/FT-j1wenhsg/photo.jpg",
    validate:{
      isURL: true
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
  password_digest: Sequelize.STRING,
  password: {
    type: Sequelize.VIRTUAL,
    validate: {
      notEmpty: true
    }
  }
}, {
  underscored: true,
  hooks: {
    beforeCreate: setEmailAndPassword, // ensure email is lower-case & password is digested
    beforeUpdate: setEmailAndPassword
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
function setEmailAndPassword(therapist) {
  therapist.email = therapist.email && therapist.email.toLowerCase()

  return new Promise((resolve, reject) =>
    bcrypt.hash(therapist.get('password'), 10, (err, hash) => {
      if (err) reject(err)
      therapist.set('password_digest', hash)
      resolve(therapist)
    })
  )
}

module.exports = Therapist
