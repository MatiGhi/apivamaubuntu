/*IMPORTS*/
const { request, response } = require('express');
const { securePassword } = require('../helpers/securePassword');
const bcryptjs = require('bcryptjs');
const { sequelize } = require('../DB/connection');
const sequelizeDatatable = require('node-sequelize-datatable');

/*MODELS*/
const {clientUser} = require('../models/clientuser');
const {Client} = require('../models/client');


const {
    getOneClientUserService,
    getFilterClientUserService,
    getClientsUserService,
    postClientUserService,
    putClientUserService,
    deleteClientUserService,
  } = require("../services/clientuser");

  const { Ok, Error, NotFound } = require("../utils/httpResponse");
  
const getClientsUser = async (req, res) => {
    try {
      const clientUsers = await getClientsUserService();
      return Ok(res, "Data retrieved successfully", clientUsers);
    } catch (error) {
      return Error(res, error.message ? error.message : "Data cannot be retrieved");
    }
  };

const getFilterClientUser = async (req = request, res = response) => {
    const { body } = req;

    try {
        const clientUsers = await getFilterClientUserService(body);
        return Ok(res, "Data retrieved successfully", clientUsers);
      } catch (error) {
        return Error(res, error.message ? error.message : "Data cannot be retrieved");
      }
}

const getOneClientUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const clientUser = await getOneClientUserService(id);
      return clientUser
        ? Ok(res, "Data retrieved successfully", clientUser)
        : NotFound(res, "Client-user is not found");
    } catch (error) {
      return Error(res, error.message ? error.message : "Data cannot be retrieved");
    }
};

const postClientUser = async (req, res) => {
    const { username, password, name, email } = req.body;
  
    if (!username || !password || !name || !email) {
      return NotFound(res, "Username, password, name and email can not be empty");
    }
  
    const newClientUser = { username, password, name, email };
  
    try {
      const createdClientUser = await postClientUserService(newClientUser);
      return Ok(res, "Client-User has been Created!", createdClientUser);
    } catch (error) {
      return Error(
        res,
        error.message ? error.message : "Client-User cannot be Created"
      );
    }
};

const putClientUser = async (req, res) => {
    const { id } = req.params;
    const { username, password, name, email } = req.body;
  
    const clientUser = { id, username, password, name, email };
  
    try {
      const updatedClientUser = await putClientUserService(clientUser);
  
      return Ok(res, "Client-user has been Updated!", updatedClientUser);
    } catch (error) {
      return Error(
        res,
        error.message ? error.message : "Client-user cannot be Updated"
      );
    }
};

const deleteClientUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedClientUser = await deleteClientUserService(id);
  
      return Ok(res, "Client-user has been Deleted!", deletedClientUser);
    } catch (error) {
      return Error(
        res,
        error.message ? error.message : "Client-user cannot be Deleted"
      );
    }
};

const blockClientUser = async (req, res = response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        if (body.blocked){

            let _id = Number(id);
            let blocked = Number(body.blocked);

            let clientuser = await clientUser.findByPk(_id);

            if (!clientuser) {
                return res.status(400).json({
                    error: true,
                    statusCode: 400,
                    msg: `Don't exist a Client User registered with id ${_id}`,
                    data: []
                });
            }

            if(blocked === 1){

                clientuser.active = 0;

                await clientuser.update();
                await clientuser.save();

                return res.status(200).json({
                    error: false,
                    statusCode: 200,
                    msg: `Client User ${id} has been Blocked`,
                    data: clientuser
                });

            } else if (blocked === 0){

                clientuser.active = 1;

                await clientuser.update();
                await clientuser.save();

                return res.status(200).json({
                    error: false,
                    statusCode: 200,
                    msg: `Client User ${id} has been Unblocked`,
                    data: clientuser
                })
            }
        } else {

            return res.status(400).json({
                error: true,
                statusCode: 400,
                msg: `You should pass correct Body data`,
                data: []
            })
        }
    
    } catch (error) {

        console.log(error);

        return res.status(500).json({
            error: true,
            statusCode: 500,
            msg: 'User Client cannot be Blocked/Unblock',
            data: []
        })   
    }
}

const resetPass = async (req, res = response) => { 

    let { id } = req.params;
    let { body } = req;

    try {

        if(body.newPassword){

            let _id = Number(id);
            let newPass = String(body.newPassword);
    
            let clientuser = await clientUser.findByPk(id);
    
            if(!clientuser){
                return res.status(400).json({
                    error: true,
                    statusCode: 400,
                    msg: `Don't exist and Client User registered with id ${_id}`,
                    data: []
                })
            }
    
            clientuser.password = securePassword(newPass);
    
            await clientuser.update();
            await clientuser.save();
    
            return res.status(200).json({
                error: true,
                statusCode: 200,
                msg: `Client User ${id} has change Password to ${newPass}`,
                data: clientuser
            })

        } else {

            return res.status(400).json({
                error: true,
                statusCode: 400,
                msg: `You should provide correct Body data`,
                data: []
            });
        }

    } catch (error) {

        console.log(error);

          return res.status(500).json({
            error: true,
            statusCode: 500,
            msg: 'User Client cannot Change Password',
            data: []
        })   
    }
}

module.exports = {
    getClientsUser,
    getFilterClientUser,
    getOneClientUser,
    postClientUser,
    putClientUser,
    blockClientUser,
    deleteClientUser,
    resetPass
}

