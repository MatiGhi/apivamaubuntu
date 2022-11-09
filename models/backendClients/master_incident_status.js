const { sequelize } = require("../DB/connection");
const { DataTypes } = require ("sequelize");

const MasterIncidentStatus = sequelize.define("master_incident_status",
    {
        id_incident_status:{
            primaryKey: true,
            autoIncrement:true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        language:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 3,
            defaultValue: 'EN'    
        },
        description:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 45,
            defaultValue: null            
        }
    },
    {
        freezeTableName: true,
    }
);

module.exports = {
    MasterIncidentStatus
}
