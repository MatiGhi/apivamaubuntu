const { sequelize } = require("../DB/connection");
const { DataTypes } = require ("sequelize");

const UtilsCities = sequelize.define("utils_cities",
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
        state_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = {
    UtilsCities
}
