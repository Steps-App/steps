const Sequelize = require('sequelize');
const db = require('../db');

const Exercise = db.define('exercise', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate : {
      notEmpty: true
    }
  },
  description : {
    type: Sequelize.TEXT,
    allowNull: false,
    validate:{
      notEmpty:true
    }
  },
  imgURL : {
    type: Sequelize.STRING,
    defaultValue:"", // add photo from static folder
    validate:{
      isURL: true
    }
  },
  vidURL : {
    type: Sequelize.STRING,
    defaultValue:"", // add photo from static folder
    validate:{
      isURL: true
    }
  }

});


module.exports = Exercise;
