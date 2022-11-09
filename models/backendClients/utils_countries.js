const { sequelize } = require("../DB/connection");
const { DataTypes } = require ("sequelize");

const UtilsCountries = sequelize.define("utils_countries",
    {
        id:{
            primaryKey: true,
            autoIncrement:true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sortname:{
            type: DataTypes.STRING,
            allowNull: false,
            max: 3
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            max: 150
        },
        phonecode:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        continent:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 300,
            defaultValue: null
        },
        idfk_continent:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        deleted_at:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        name_sp:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 150,
            defaultValue: ''
        },
        iso3:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 4,
            defaultValue: ''
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = {
    UtilsCountries
}
