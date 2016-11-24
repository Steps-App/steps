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
    defaultValue:"http://www.canadatamilsangam.com/wp-content/uploads/2015/04/default.png",
    validate:{
      isURL: true
    }
  },
  vid_url : {
    type: Sequelize.STRING,
    defaultValue:"http://www.canadatamilsangam.com/wp-content/uploads/2015/04/default.png",
    validate :{
      isURL: true
    }
  }
}, {
  underscored: true
});

module.exports = Exercise;
