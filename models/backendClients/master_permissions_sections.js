const { sequelize } = require("../DB/connection");
const { DataTypes } = require ("sequelize");

const MasterPermissionsSections = sequelize.define("master_permissions_sections",
    {
        id_section:{
            primaryKey: true,
            autoIncrement:true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            max: 50
        },
        description:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 145,
            defaultValue: null         
        },
        id_block:{
            type: DataTypes.INTEGER,
            allowNull: true,
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
    MasterPermissionsSections
}
