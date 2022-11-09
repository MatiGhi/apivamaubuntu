const { sequelize } = require("../DB/connection");
const { DataTypes } = require ("sequelize");

const MasterPermissions = sequelize.define("master_permissions",
    {
        id_permission:{
            primaryKey: true,
            autoIncrement:true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        block:{
            type: DataTypes.INTEGER,
            allowNull: false 
        },
        section:{
            type: DataTypes.INTEGER,
            allowNull: false 
        },
        permission:{
            type: DataTypes.STRING,
            allowNull: false,
            max: 75
        },
        description:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 145,
            defaultValue: null            
        },
        endpoint:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 150,
            defaultValue: null            
        },
        deleted_at:{
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
    MasterPermissions
}
