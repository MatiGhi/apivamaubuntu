const { sequelize } = require("../DB/connection");
const { DataTypes } = require ("sequelize");

const MasterIncidentDestination = sequelize.define("master_incident_destination",
    {
        id_destination:{
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
            max: 150,
            defaultValue: null            
        }
    },
    {
        freezeTableName: true,
    }
);

module.exports = {
    MasterIncidentDestination
}
