const { sequelize } = require("../DB/connection");
const { DataTypes } = require ("sequelize");

const Video = sequelize.define("videos",
    {
        id_video:{
            primaryKey: true,
            autoIncrement:true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 100,
            defaultValue: null
        },
        filename:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 100,
            defaultValue: null
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        owner:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        start_time:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        fingerprint_sha256:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 256,
            defaultValue: null
        },    
        size:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 45,
            defaultValue: null
        }, 
        mimetype:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 75,
            defaultValue: null
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
    Video
}
