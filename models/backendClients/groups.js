const { sequelize } = require("../DB/connection");
const { DataTypes } = require ("sequelize");

const GroupRole = sequelize.define("groups_roles",
    {
        id:{
            primaryKey: true,
            autoIncrement:true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_group:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_role:{
            type: DataTypes.INTEGER,
            allowNull: false
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
    GroupRole
}
