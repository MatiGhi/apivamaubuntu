const { sequelize } = require("../DB/connection");
const { DataTypes } = require('sequelize');

const masterFtpServer = sequelize.define("master_ftp_severs",
    {
        id_pool: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: true,
            max: 100,
            defaultValue: null
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
            max: 100,
            defaultValue: null
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            max: 150,
            defaultValue: null
        }
    },
    {
        timestamps: true
    });