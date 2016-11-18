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
  img_url : {
    type: Sequelize.STRING,
    defaultValue:"http://google.com/image.jpg",
    validate:{
      isURL: true
    }
  },
  vid_url : {
    type: Sequelize.STRING,
    defaultValue:"http://google.com/image.jpg",
    validate :{
      isURL: true
    }
  }
});

module.exports = Exercise;
