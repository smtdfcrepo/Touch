const path = require("path")
const { Sequelize , DataTypes} = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname,"../../Data/DB/token.db")
});


module.exports =  sequelize.define("token",{
	tok:DataTypes.TEXT
},{
	freezeTableName: true,
	timestamps: false,
  createdAt: false,
  updatedAt: false
})