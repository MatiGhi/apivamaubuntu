const { sequelize } = require("../DB/connection");
const { DataTypes } = require('sequelize');

const masterCluster = sequelize.define("master_cluster",
    {
        id_cluster:{
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nombre_cluster:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 200,
            defaultValue: null
        },
        ip_cluster: {
            type: DataTypes.STRING,
            allowNull: true,
            max: 200,
            defaultValue: null
        },
        port_cluster: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null 
        },
        desc_cluster: {
            type: DataTypes.STRING,
            allowNull: true,
            max: 500,
            defaultValue: null
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    },{
        freezeTableName: true,
        timestamps: false,
    });

module.exports = {
    masterCluster
}