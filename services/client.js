/*MODELS*/
const { Client } = require("../models/client");
const sequelizeDatatable = require('node-sequelize-datatable');

const getClientsService = async () => {
    try {
      return Client.findAll();
    } catch (error) {
      throw error;
    }
  };

const getFilterClientService = async (body) => {
    try {
      let dataTableObj = await sequelizeDatatable(body);
      return Client.findAndCountAll(dataTableObj);
    } catch (error) {
      throw error;
    }
  };

const getOneClientService = async (userId) => {
  try {
    return Client.findByPk(userId);
  } catch (error) {
    throw error;
  }
};

const putClientService = async (client) => {
  const {
    id,
    business_name,
    domain,
    email,
    phone,
    nif_cif,
    address,
    country,
    state,
    province,
    town,
    id_cluster,
  } = client;

  try {
    const updatedClient = await Client.findByPk(id);

    if (!updatedClient) {
      throw new Error(`Doesn't exist an Client-User registered with id ${id}`);
    }

    if (business_name) {
      const checkBusinessNameExistence = await Client.findOne({
        where: { business_name },
      });

      if (checkBusinessNameExistence) {
        throw new Error(`Business name is already registered`);
      }
    }

    if (email) {
      const checkEmailExistence = await Client.findOne({
        where: { email },
      });

      if (checkEmailExistence) {
        throw new Error(`Email is already registered`);
      }
    }

    await updatedClient.update({
      business_name,
      domain,
      email,
      phone,
      nif_cif,
      address,
      country,
      state,
      province,
      town,
      id_cluster,
    });

    return updatedClient.save();
  } catch (error) {
    throw error;
  }
};

const deleteClientService = async (userId) => {
  try {
    const deletedClient = await Client.findOne({
      where: { id: userId, active: 1 },
    });

    if (!deletedClient) {
      throw new Error(
        `Doesn't exist an Client registered with id ${userId} and in status Active`
      );
    }

    await deletedClient.update({ active: 0, deleted_at: new Date() });
    return deletedClient.save();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getClientsService,
  getFilterClientService,
  getOneClientService,
  putClientService,
  deleteClientService,
};
