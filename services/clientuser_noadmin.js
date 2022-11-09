const { securePassword } = require("../helpers/securePassword");
const { clientUserNoAdmin } = require("../models/clientuser_noadmin");
const { clientUser } = require("../models/clientuser");
const { Admin_access } = require("../models/admin_access");
const sequelizeDatatable = require("node-sequelize-datatable");

const getClientsUserNoAdminService = async () => {
  try {
    return clientUserNoAdmin.findAll();
  } catch (error) {
    throw error;
  }
};

const getFilterClientUserNoAdminService = async (body) => {
  try {
    let dataTableObj = await sequelizeDatatable(body);
    return clientUserNoAdmin.findAndCountAll(dataTableObj);
  } catch (error) {
    throw error;
  }
};

const getOneClientUserNoAdminService = async (userId) => {
  try {
    return clientUserNoAdmin.findByPk(userId);
  } catch (error) {
    throw error;
  }
};

const postClientUserNoAdminService = async (clientUser_NoAdmin) => {
  const { username, password, name, email } = clientUser_NoAdmin;

  try {

    const existAsAdminAccess = await Admin_access.findOne({
      where: { username },
    });

    const existAsClientUser = await clientUser.findOne({
      where: { username },
    });

    const existAsClientUserNoAdmin = await clientUserNoAdmin.findOne({
      where: { username },
    });

    if (existAsAdminAccess || existAsClientUser || existAsClientUserNoAdmin) {
      throw new Error(`Username is already in use. Please choose another one.`);
    }

    const checkEmailExistence = await clientUserNoAdmin.findOne({
      where: { email },
    });

    if (checkEmailExistence) {
      throw new Error(`Email is already registered`);
    }
    const createdClientUserNoAdmin = new clientUserNoAdmin({
      username,
      password,
      name,
      email,
    });

    createdClientUserNoAdmin.password = securePassword(password);

    return createdClientUserNoAdmin.save();
  } catch (error) {
    throw error;
  }
};

const putClientUserNoAdminService = async (clientUser_NoAdmin) => {
  const { id, username, password, name, email } = clientUser_NoAdmin;

  try {
    const updatedClientuserNoAdmin = await clientUserNoAdmin.findByPk(id);

    if (!updatedClientuserNoAdmin) {
      throw new Error(`Doesn't exist an Client-User registered with id ${id}`);
    }

    if (username) {
      const checkUsernameExistence = await clientUserNoAdmin.findOne({
        where: { username },
      });

      if (checkUsernameExistence) {
        throw new Error(`Username is already registered`);
      }
    }

    if (email) {
      const checkEmailExistence = await clientUserNoAdmin.findOne({
        where: { email },
      });

      if (checkEmailExistence) {
        throw new Error(`Email is already registered`);
      }
    }

    let securePass;
    if (password) {
      securePass = securePassword(password);
    }

    await updatedClientuserNoAdmin.update({
      username,
      password: securePass,
      name,
      email,
    });

    return updatedClientuserNoAdmin.save();
  } catch (error) {
    throw error;
  }
};

const deleteClientUserNoAdminService = async (userId) => {
  try {
    const deletedClientUserNoAdmin = await clientUserNoAdmin.findOne({
      where: { id: userId, active: 1 },
    });

    if (!deletedClientUserNoAdmin) {
      throw new Error(
        `Doesn't exist an ClientUser-NoAdmin registered with id ${userId} and in status Active`
      );
    }

    await deletedClientUserNoAdmin.update({
      active: 0,
      deleted_at: new Date(),
    });
    return deletedClientUserNoAdmin.save();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getClientsUserNoAdminService,
  getFilterClientUserNoAdminService,
  getOneClientUserNoAdminService,
  postClientUserNoAdminService,
  putClientUserNoAdminService,
  deleteClientUserNoAdminService,
};
