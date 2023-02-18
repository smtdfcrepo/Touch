const path = require("path")
const { Sequelize , DataTypes} = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname,"../../Data/DB/account.db")
});


module.exports =  sequelize.define("account",{
	username:DataTypes.TEXT,
	password:DataTypes.TEXT,
	rule:DataTypes.TEXT,
	attr:DataTypes.TEXT,
},{
	freezeTableName: true,
	timestamps: false,
  createdAt: false,
  updatedAt: false
})