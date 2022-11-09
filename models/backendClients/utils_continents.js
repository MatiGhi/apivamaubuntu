const { sequelize } = require("../DB/connection");
const { DataTypes } = require ("sequelize");

const UtilsContinents = sequelize.define("utils_continents",
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
            max: 40
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = {
    UtilsContinents
}
