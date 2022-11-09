const { sequelize } = require("../DB/connection");
const { DataTypes } = require ("sequelize");

const MasterPermissionsTranslations = sequelize.define("master_permissions_translations",
    {
        id_permission:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        language:{
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false,
            max: 3
        },
        section:{
            type: DataTypes.INTEGER,
            allowNull: false 
        },
        description:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 200,
            defaultValue: null            
        },
        permission:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 200,
            defaultValue: null
        }
    },
    {
        freezeTableName: true,
    }
);

module.exports = {
    MasterPermissionsTranslations
}
