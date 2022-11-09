const { securePassword } = require("../helpers/securePassword");
const { Admin_access } = require("../models/admin_access");
const { clientUser } = require("../models/clientuser");
const { clientUserNoAdmin } = require("../models/clientuser_noadmin");

const getAdminAccessService = async () => {
  try {
    return Admin_access.findAll();
  } catch (error) {
    throw error;
  }
};

const getOneAdminAccessService = async (userId) => {
  try {
    return Admin_access.findByPk(userId);
  } catch (error) {
    throw error;
  }
};

const postAdminAccessService = async (adminAccess) => {
  const { username, password } = adminAccess;

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

    const createdAdminAccess = new Admin_access({ username, password });

    createdAdminAccess.password = securePassword(password);

    return createdAdminAccess.save();
  } catch (error) {
    throw error;
  }
};

const putAdminAccessService = async (adminAccess) => {
  const { id, username, password } = adminAccess;

  try {
    const updatedAdminAccess = await Admin_access.findByPk(id);

    if (!updatedAdminAccess) {
      throw new Error(`Doesn't exist an Admin Access registered with id ${id}`);
    }

    let securePass;
    if (password) {
      securePass = securePassword(password);
    }

    await updatedAdminAccess.update({ username, password: securePass });

    return updatedAdminAccess.save();
  } catch (error) {
    throw error;
  }
};


module.exports = {
  getAdminAccessService,
  getOneAdminAccessService,
  postAdminAccessService,
  putAdminAccessService
};
