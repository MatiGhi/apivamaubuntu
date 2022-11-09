/*SERVICE*/
const { getAdminAccessService,
        getOneAdminAccessService,
        postAdminAccessService,
        putAdminAccessService,
        deleteAdminAccessService } = require('../services/admin_access');

const { Ok, Error, NotFound } = require("../utils/httpResponse");

/*IMPORTS*/
const { request, response } = require('express');
const { securePassword } = require('../helpers/securePassword');

/*MODELS*/
const { Admin_access } = require('../models/admin_access');

const getAdminAccess = async (req, res) => {
    try {
      const adminAccess = await getAdminAccessService();
      return Ok(res, "Data retrieved successfully", adminAccess);
    } catch (error) {
      return Error(res, error.message ? error.message : "General Error");
    }
  };

const getOneAdminAccess = async (req = request, res = response) => {

    const { id } = req.params;

    try {
      const adminAccess = await getOneAdminAccessService(id);
      return adminAccess
        ? Ok(res, "Data retrieved successfully", adminAccess)
        : NotFound(res, "Admin access is not found");
    } catch (error) {
      return Error(res, error.message ? error.message : "General Error");
    }
} 


const postAdminAccess = async (req, res = response) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return NotFound(res, "Username and password can not be empty");
    }

    const newAdminAccess = { username, password };

    try {
        const createdAdminAccess = await postAdminAccessService(newAdminAccess);
        return Ok(res, "Admin Access has been Created!", createdAdminAccess);
    } catch (error) {
        return Error(
            res,
            error.message ? error.message : "Admin Access cannot be Created"
        );
    }
} 

const putAdminAccess = async (req, res = response) => {

    const { id } = req.params;
    const { username, password } = req.body;

    const adminAccessData = { id, username, password };

    try {
        const updatedAdminAccess = await putAdminAccessService(adminAccessData);
        return Ok(res, "Admin Access has been Updated!", updatedAdminAccess);
    } catch (error) {
        return Error(
        res,
        error.message ? error.message : "Admin Access cannot be Updated"
        );
    }
}

const resetPass = async (req, res = response) => { 

    let { id } = req.params;
    let { body } = req;

    try {

        if(body.newPassword){

            let _id = Number(id);
            let newPass = String(body.newPassword);

            let adminAccess = await  Admin_access.findByPk(_id);

            if(!adminAccess){
                return res.status(400).json({
                    error: true,
                    statusCode: 400,
                    msg: `Don't exist and Admin-Access registered with id ${_id}`,
                    data: []
                });
            }

            adminAccess.password = securePassword(newPass);

            await adminAccess.update();
            await adminAccess.save();

            return res.status(200).json({
                error: false,
                statusCode: 200,
                msg: `Admin-Access ${id} has change Password to ${newPass}`,
                data: clientuser_NoAdmin
            });
            
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
            msg: 'Admin-Access cannot Change Password',
            data: []
        })   
    }
}

module.exports = {
    getAdminAccess,
    getOneAdminAccess,
    postAdminAccess,
    putAdminAccess,
    resetPass
}

