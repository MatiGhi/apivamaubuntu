const { sequelize } = require("../DB/connection");
const { DataTypes } = require ("sequelize");

const UtilsProvinces = sequelize.define("utils_provinces",
    {
        id:{
            primaryKey: true,
            autoIncrement:true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            max: 30
        },
        country_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },        
        ISO3166_2:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 10,
            defaultValue: ''
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = {
    UtilsProvinces
}
