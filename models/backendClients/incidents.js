const { sequelize } = require("../DB/connection");
const { DataTypes } = require ("sequelize");

const Incident = sequelize.define("incidents",
    {
        id_incident:{
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
        start_time:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        reference_code:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 100,
            defaultValue: null
        },
        id_incident_status:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        signature:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 256,
            defaultValue: null
        },
        address:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 500,
            defaultValue: null
        },   
        country:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 75,
            defaultValue: null
        },
        municipality:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 150,
            defaultValue: null
        },
        verbal_warning:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },     
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        police_officers_tip:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 150,
            defaultValue: null
        },
        police_officers_unit:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 150,
            defaultValue: null
        },
        id_motivation:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        id_reason:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        description:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 500,
            defaultValue: null
        },
        observations:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 500,
            defaultValue: null
        },
        notes:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 500,
            defaultValue: null
        },
        id_destination:{
            type: DataTypes.INTEGER,
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
    Incident
}
