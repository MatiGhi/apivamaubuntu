const { securePassword } = require("../helpers/securePassword");
const { clientUser } = require("../models/clientuser");
const { Admin_access } = require("../models/admin_access");
const { clientUserNoAdmin } = require("../models/clientuser_noadmin");
const sequelizeDatatable = require('node-sequelize-datatable');

const getClientsUserService = async () => {
  try {
    return clientUser.findAll();
  } catch (error) {
    throw error;
  }
};

const getFilterClientUserService = async (body) => {
  try {
    let dataTableObj = await sequelizeDatatable(body);
    return clientUser.findAndCountAll(dataTableObj);
  } catch (error) {
    throw error;
  }
};

const getOneClientUserService = async (userId) => {
  try {
    return clientUser.findByPk(userId);
  } catch (error) {
    throw error;
  }
};

const postClientUserService = async (client_user) => {
  const { username, password, name, email } = client_user;

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

    const checkEmailExistence = await clientUser.findOne({
      where: { email },
    });

    if (checkEmailExistence) {
      throw new Error(`Email is already registered`);
    }
    const createdClientUser = new clientUser({
      username,
      password,
      name,
      email,
    });

    createdClientUser.password = securePassword(password);

    return createdClientUser.save();
  } catch (error) {
    throw error;
  }
};

const putClientUserService = async (client_user) => {
  const { id, username, password, name, email } = client_user;

  try {
    const updatedClientuser = await clientUser.findByPk(id);

    if (!updatedClientuser) {
      throw new Error(`Doesn't exist an Client-User registered with id ${id}`);
    }

    if (username) {
      const checkUsernameExistence = await clientUser.findOne({
        where: { username },
      });

      if (checkUsernameExistence) {
        throw new Error(`Username is already registered`);
      }
    }

    if (email) {
      const checkEmailExistence = await clientUser.findOne({
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

    await updatedClientuser.update({
      username,
      password: securePass,
      name,
      email,
    });

    return updatedClientuser.save();
  } catch (error) {
    throw error;
  }
};

const deleteClientUserService = async (userId) => {
  try {
    const deletedClientUser = await clientUser.findOne({
      where: { id: userId, active: 1 },
    });

    if (!deletedClientUser) {
      throw new Error(
        `Doesn't exist an Client-User registered with id ${userId} and in status Active`
      );
    }

    await deletedClientUser.update({ active: 0, deleted_at: new Date() });
    return deletedClientUser.save();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getClientsUserService,
  getFilterClientUserService,
  getOneClientUserService,
  postClientUserService,
  putClientUserService,
  deleteClientUserService,
};
