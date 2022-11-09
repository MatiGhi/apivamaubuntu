const { sequelize } = require("../DB/connection");
const { DataTypes } = require('sequelize');

const creatorTable = sequelize.define("creator_table",
{
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    username:{
        type: DataTypes.STRING,
        allowNull: true,
        max: 250,
        defaultValue: null
    },
    password:{
        type: DataTypes.STRING,
        allowNull: true,
        max: 500,
        defaultValue: null
    },
    id_cluster:{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    master_db:{
        type: DataTypes.STRING,
        allowNull: true,
        max: 150,
        defaultValue: null
    }
},{
    freezeTableName: true,
    timestamps: false
});

module.exports = {
    creatorTable
}