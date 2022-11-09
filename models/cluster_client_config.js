const { sequelize } = require("../DB/connection");
const { DataTypes } = require('sequelize');

const clusterClientConfig = sequelize.define("cluster_clients_config",
    {
        db_name: {
            type: DataTypes.STRING,
            allowNull: true,
            max: 200,
            defaultValue: null
        },
        db_user: {
            type: DataTypes.STRING,
            allowNull: true,
            max: 200,
            defaultValue: null
        },
        db_password: {
            type: DataTypes.STRING,
            allowNull: true,
            max: 200,
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

    