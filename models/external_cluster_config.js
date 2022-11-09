const { sequelize } = require("../DB/connection");
const { DataTypes } = require('sequelize');

const externalClusterConfig = sequelize.define("external_cluster_config",
    {
        id_cluster: {
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        id_client: {
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: true,
            max: 50,
            defaultValue: null
        },
        port: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: null
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    },
    {
        timestamps: true
    });
