const { sequelize } = require("../DB/connection");
const { DataTypes } = require ("sequelize");

const User = sequelize.define("users",
    {
        id_user:{
            primaryKey: true,
            autoIncrement:true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            max: 150
        },
        email:{
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            max: 100
        },
        mobile:{
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            max: 45
        },
        active:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
            max: 100
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            max: 500
        },
        deleted_at:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
    }
);

module.exports = {
    User
}
