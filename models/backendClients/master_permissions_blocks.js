const { sequelize } = require("../DB/connection");
const { DataTypes } = require ("sequelize");

const MasterPermissionsBlocks = sequelize.define("master_permissions_blocks",
    {
        id_block:{
            primaryKey: true,
            autoIncrement:true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name:{
            type: DataTypes.INTEGER,
            allowNull: false,
            max: 50
        },
        description:{
            type: DataTypes.STRING,
            allowNull: true,
            max: 145,
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
    MasterPermissionsBlocks
}
