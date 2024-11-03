const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Message = sequelize.define('Message', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Association
Message.belongsTo(User, { as: 'sender' });
Message.belongsTo(User, { as: 'receiver' });

module.exports = Message;
