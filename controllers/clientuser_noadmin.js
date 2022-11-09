const {
    getClientsUserNoAdminService,
    getFilterClientUserNoAdminService,
    getOneClientUserNoAdminService,
    postClientUserNoAdminService,
    putClientUserNoAdminService,
    deleteClientUserNoAdminService,
  } = require("../services/clientuser_noadmin");

  const { Ok, Error, NotFound } = require("../utils/httpResponse");

const getClientsUserNoAdmin = async (req, res) => {
    try {
      const clientUsersNoAdmin = await getClientsUserNoAdminService();
      return Ok(res, "Data retrieved successfully", clientUsersNoAdmin);
    } catch (error) {
      return Error(res, error.message ? error.message : "General Error");
    }
  };

  const getFilterClientUserNoAdmin = async (req = request, res = response) => {
    const { body } = req;

    try {
        const clientUsers = await getFilterClientUserNoAdminService(body);
        return Ok(res, "Data retrieved successfully", clientUsers);
      } catch (error) {
        return Error(res, error.message ? error.message : "Data cannot be retrieved");
      }
}

  const getOneClientUserNoAdmin = async (req, res) => {
    const { id } = req.params;
  
    try {
      const clientUsersNoAdmin = await getOneClientUserNoAdminService(id);
      return clientUsersNoAdmin
        ? Ok(res, "Data retrieved successfully", clientUsersNoAdmin)
        : NotFound(res, "ClientUser-NoAdmin is not found");
    } catch (error) {
      return Error(res, error.message ? error.message : "General Error");
    }
};

  const postClientUserNoAdmin = async (req, res) => {
    const { username, password, name, email } = req.body;
  
    if (!username || !password || !name || !email) {
      return NotFound(res, "Username, password, name and email can not be empty");
    }
  
    const newClientUserNoAdmin = { username, password, name, email };
  
    try {
      const createdClientUserNoAdmin = await postClientUserNoAdminService(
        newClientUserNoAdmin
      );
      return Ok(
        res,
        "ClientUser-NoAdmin has been Created!",
        createdClientUserNoAdmin
      );
    } catch (error) {
      return Error(
        res,
        error.message ? error.message : "ClientUser-NoAdmin cannot be Created"
      );
    }
  };

  const putClientUserNoAdmin = async (req, res) => {
    const { id } = req.params;
    const { username, password, name, email } = req.body;
  
    const clientUserNoAdmin = { id, username, password, name, email };
  
    try {
      const updatedClientUserNoAdmin = await putClientUserNoAdminService(
        clientUserNoAdmin
      );
  
      return Ok(
        res,
        "ClientUser-NoAdmin has been Updated!",
        updatedClientUserNoAdmin
      );
    } catch (error) {
      return Error(
        res,
        error.message ? error.message : "ClientUser-NoAdmin cannot be Updated"
      );
    }
  };

  const deleteClientUserNoAdmin = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedClientUserNoAdmin = await deleteClientUserNoAdminService(id);
  
      return Ok(
        res,
        "ClientUser-NoAdmin has been Deleted!",
        deletedClientUserNoAdmin
      );
    } catch (error) {
      return Error(
        res,
        error.message ? error.message : "ClientUser-NoAdmin cannot be Deleted"
      );
    }
  };

const blockClientUserNoAdmin = async (req, res = response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        if (body.blocked){

            let _id = Number(id);
            let blocked = Number(body.blocked);

            let clientuser_NoAdmin = await clientUserNoAdmin.findByPk(_id);

            if (!clientuser_NoAdmin) {
                return res.status(400).json({
                    error: true,
                    statusCode: 400,
                    msg: `Don't exist a Client User No Admin registered with id ${_id}`,
                    data: []
                });
            }

            if(blocked === 1){

                clientuser_NoAdmin.active = 0;

                await clientuser_NoAdmin.update();
                await clientuser_NoAdmin.save();

                return res.status(200).json({
                    error: false,
                    statusCode: 200,
                    msg: `Client User No Admin ${id} has been Blocked`,
                    data: clientuser_NoAdmin
                });

            } else if (blocked === 0){

                clientuser_NoAdmin.active = 1;

                await clientuser_NoAdmin.update();
                await clientuser_NoAdmin.save();

                return res.status(200).json({
                    error: false,
                    statusCode: 200,
                    msg: `Client User No Admin ${id} has been Unblocked`,
                    data: clientuser_NoAdmin
                });
            }
        } else {
            res.status(500).json({
                error: true,
                statusCode: 500,
                msg: 'You must provide correct data on body',
                data: []
            });   
        }
        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: true,
            statusCode: 500,
            msg: 'Client User No Admin cannot be Blocked/Unblock',
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

            let clientuser_NoAdmin = await clientUserNoAdmin.findByPk(id);

            if(!clientuser_NoAdmin){
                return res.status(400).json({
                    error: true,
                    statusCode: 400,
                    msg: `Don't exist and Client User No Admin registered with id ${_id}`,
                    data: []
                });
            }

            clientuser_NoAdmin.password = securePassword(newPass);

            await clientuser_NoAdmin.update();
            await clientuser_NoAdmin.save();

            return res.status(200).json({
                error: false,
                statusCode: 200,
                msg: `Client User No Admin ${id} has change Password to ${newPass}`,
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
            msg: 'Client User No Admin cannot Change Password',
            data: []
        })   
    }
}

module.exports = {
    getClientsUserNoAdmin,
    getFilterClientUserNoAdmin,
    getOneClientUserNoAdmin,
    postClientUserNoAdmin,
    putClientUserNoAdmin,
    blockClientUserNoAdmin,
    deleteClientUserNoAdmin,
    resetPass
}

