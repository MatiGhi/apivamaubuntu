const { sequelize } = require("../DB/connection");
const { DataTypes } = require("sequelize");

const Admin_access = sequelize.define(
  "admin_access",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.INTEGER,
    },
    remember_token: {
      type: DataTypes.STRING,
    },
    attempts: {
      type: DataTypes.INTEGER,
    },
    locked_last_attempt: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = {
  Admin_access,
};