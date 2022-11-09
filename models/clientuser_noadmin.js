const { sequelize } = require("../DB/connection");
const { DataTypes } = require ('sequelize');

const clientUserNoAdmin = sequelize.define("clientsusers_noadmins",
    {
        id:{
            primaryKey: true,
            autoIncrement:true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        username:{
            type: DataTypes.STRING,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            max: 191
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
            max: 191,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            max: 191
        },
        remember_token:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 500,
            defaultValue: null
        },
        client_id:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        client_id_login_default:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        roles_names:{
            //type: DataTypes.ENUM(["user","admin"]),
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            max: 300
        },
        active: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        deleted_at:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        locked_last_attempt:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        attempts:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        freezeTableName: true,
        timestamps: true
    });

module.exports = {
    clientUserNoAdmin
};

