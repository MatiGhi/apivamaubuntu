const { sequelize } = require("../DB/connection");
const { DataTypes } = require ("sequelize");

const Client = sequelize.define("clients",
    {
        id:{
            primaryKey: true,
            autoIncrement:true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        business_name:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 500,
            defaultValue: null
        },
        domain:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 45,
            defaultValue: null
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
            max: 191,
            allowNull: false
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 100,
            defaultValue: null
        },
        nif_cif:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 500,
            defaultValue: null
        },
        address:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 400,
            defaultValue: null
        },
        country:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 150,
            defaultValue: null
        },
        state:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 300,
            defaultValue: null
        },
        province:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 300,
            defaultValue: null
        },
        town:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 300,
            defaultValue: null
        },
        id_cluster:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        active:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1
        },
        deleted_at: {
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
    Client
}
