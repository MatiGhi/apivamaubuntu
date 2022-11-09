const { sequelize } = require("../DB/connection");
const { DataTypes } = require ("sequelize");

const UserGroup = sequelize.define("users_groups",
    {
        id:{
            primaryKey: true,
            autoIncrement:true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_user:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_group:{
            type: DataTypes.INTEGER,
            allowNull: false
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
    UserGroup
}
