const Sequelize = require('sequelize')
const db = require('../db')

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
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  DOB: {
    type: Sequelize.STRING,
    validate: {
      isDate: true
    }
  },
  gender: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['M','F']]
    }
  },
  imgURL: Sequelize.STRING,
  password_digest: Sequelize.STRING,
  password: {
    type: Sequelize.VIRTUAL,
    validate: {
      notEmpty: true
    }
  }
}, {
  indexes: [{fields: ['email'], unique: true,}],  // email is also a unique index
  hooks: {
    beforeCreate: setEmailAndPassword,  // ensure email is lower-case & password is digested
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
const setEmailAndPassword = (patient) => {
  patient.email = patient.email && patient.email.toLowerCase()

  return new Promise((resolve, reject) =>
    bcrypt.hash(therapist.get('password'), 10, (err, hash) => {
      if (err) reject(err)
      therapist.set('password_digest', hash)
      resolve(patient)
    })
  )
}

module.exports = Patient;
