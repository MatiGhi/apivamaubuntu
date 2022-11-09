const { sequelize } = require("../DB/connection");
const { DataTypes } = require ("sequelize");

const Roles = sequelize.define("roles",
    {
        id_rol:{
            primaryKey: true,
            autoIncrement:true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 75,
            defaultValue: null 
        },
        description:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 150,
            defaultValue: null 
        },
        tier:{
            type: DataTypes.ENUM('1', '2', '3', '4'),
            defaultValue: '1' 
        },
        deleted_at:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    },
    {
        freezeTableName: true,
    }
);

module.exports = {
    Roles
}
