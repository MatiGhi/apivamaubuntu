const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { verifyToken } = require('../helpers/generateToken');
const { genToken } = require('../helpers/generateToken');
const { Admin_access } = require('../models/admin_access');
const { Client } = require('../models/client');
const { clientUser } = require('../models/clientuser');
const { clientUserNoAdmin } = require('../models/clientuser_noadmin');
const { loggedUser } = require('../models/logged_users');

const login = async (req, res = response) => {

   const { username, password } = req.body;

   try {
      
    const AdminAccess = await Admin_access.findOne({ where: {username: username}});
    
    const clientuser = await clientUser.findOne({ where: { username: username }});

    const clientuserNoAdmin = await clientUserNoAdmin.findOne({ where: { username: username }});

   if((!AdminAccess) && (!clientuser) && (!clientuserNoAdmin)){   

      return res.status(401).json({
         error: true,
         statusCode: 401,
         msg: `Please provide a valid Username`,
         data: []
      });
   }
   
   if (password){

      let validPassword;

      if (AdminAccess){
         validPassword = bcryptjs.compareSync(password ,AdminAccess.password);

         if(!validPassword){

            let count_attempts = Object.values(AdminAccess)[1]["attempts"];
            count_attempts += 1;

            await AdminAccess.update({attempts: count_attempts});
            await AdminAccess.save();

            if (AdminAccess.attempts >= 3){

               await AdminAccess.update({locked_last_attempt: new Date()});
               await AdminAccess.update({active: 0});
               await AdminAccess.save();

               return res.status(401).json({
                  error: true,
                  statusCode: 401,
                  msg: "Your account has been locked because you have tried to log in too many times with the wrong password",
                  data: []
               });
            }
         }
      } 

      if (clientuser){
         validPassword = bcryptjs.compareSync(password ,clientuser.password);

         if(!validPassword){

            let count_attempts = Object.values(clientuser)[1]["attempts"];
            count_attempts += 1;

            await clientuser.update({attempts: count_attempts});
            await clientuser.save();

            if (clientuser.attempts >= 3){

               await clientuser.update({locked_last_attempt: new Date()});
               await clientuser.update({active: 0});
               await clientuser.save();

               return res.status(401).json({
                  error: true,
                  statusCode: 401,
                  msg: "Your account has been locked because you have tried to log in too many times with the wrong password",
                  data: []
               });
            }
         }

      }

      if (clientuserNoAdmin){

         validPassword = bcryptjs.compareSync(password ,clientuserNoAdmin.password);

         if(!validPassword){

            let count_attempts = Object.values(clientuserNoAdmin)[1]["attempts"];
            count_attempts += 1;

            await clientuserNoAdmin.update({attempts: count_attempts});
            await clientuserNoAdmin.save();

            if (clientuserNoAdmin.attempts >= 3){

               await clientuserNoAdmin.update({locked_last_attempt: new Date()});
               await clientuserNoAdmin.update({active: 0});
               await clientuserNoAdmin.save();

               return res.status(401).json({
                  error: true,
                  statusCode: 401,
                  msg: "Your account has been locked because you have tried to log in too many times with the wrong password",
                  data: []
               });
            }
         }
      }
  
      if(!validPassword){

         return res.status(401).json({
            error: true,
            statusCode: 401,
            msg: "Incorrect Password",
            data: []
         });

      }
   }
  
    if (AdminAccess){

      let id_user = Object.values(AdminAccess)[1]["id"];
      let username = Object.values(AdminAccess)[1]["username"];
      let active = Object.values(AdminAccess)[1]["active"];

      if (active === 1){

         await loggedUser.create({
            id_user,
            username
         });


         const token = await genToken(AdminAccess.id, "Admin-Access");

         await AdminAccess.update({attempts: 0});

         await AdminAccess.update({remember_token: token});

         await AdminAccess.save();

         return res.status(202).json({
            error: false,
            statusCode: 202,
            login: true,
            type_user: "Admin-Access",
            data: AdminAccess
         });


      } else if (active === 0){

         return res.status(400).json({
            error: true,
            statusCode: 400,
            msg: `Admin-Access ${username} is Blocked - You're not allowed Login`,
            data: []
         });
      }
   }
            
    if (clientuser){

      let id_user = Object.values(clientuser)[1]["id"];
      let username = Object.values(clientuser)[1]["username"];
      let active = Object.values(clientuser)[1]["active"];
      let clientuser_clientId = Object.values(clientuser)[1]["client_id"];
      let client = await Client.findByPk(clientuser_clientId);

      if (client.active === 0) {

         return res.status(400).json({
            error: true,
            statusCode: 400,
            msg: `Client ${client.business_name} is Blocked - You're not allowed Login`,
            data: []
         });
      }

      if (active === 1){

         await loggedUser.create({
            id_user,
            username
         });

         const token = await genToken(id_user,"Client-User");

         await clientuser.update({attempts: 0});

         await clientuser.update({remember_token: token});

         await clientuser.save();

         return res.status(202).json({
            error: false,
            statusCode: 202,
            login: true,
            type_user: "client-User",
            data: clientuser
         });


      } else if (active === 0) {

         return res.status(401).json({
            error: true,
            statusCode: 401,
            login: false,
            type_user: "client-User",
            msg: 'Your user is Blocked and is not allowed to Login',
            data:[]
         });
      }
   }

   if (clientuserNoAdmin){

      let id_user = Object.values(clientuserNoAdmin)[1]["id"];
      let username = Object.values(clientuserNoAdmin)[1]["username"];
      let active = Object.values(clientuserNoAdmin)[1]["active"];

      if (active === 1){

         await loggedUser.create({
            id_user,
            username
         });

         const token = await genToken(id_user,"ClientUser-NoAdmin");

         await clientuserNoAdmin.update({attempts: 0});

         await clientuserNoAdmin.update({remember_token: token})

         await clientuserNoAdmin.save();

         return res.status(202).json({
            error: false,
            statusCode: 202,
            login: true,
            type_user: "client-user-noAdmin",
            data: clientuserNoAdmin
         });

      } else if (active === 0) {

         return res.status(401).json({
            error: true,
            statusCode: 401,
            login: false,
            type_user: "client-user-noAdmin",
            msg: 'Your user is Blocked is and not allowed to Login',
            data:[]
         });
      }
   }

   } catch (error){

      console.log(error);

      res.status(500).json({
         error: true,
         statusCode: 500,
         msg: 'User cannot be logged',
         data:[]
     }); 
   }
}

const logout = async (req, res = response) => {
   //eliminar el token valido y la session. Ver payload.

   //const {token} = req.headers.authorization;

   try {

      if(req.headers.authorization){

         //const clientuser = await clientUser.findOne({ where: { username: username }});
         //const clientuserNoAdmin = await clientUserNoAdmin.findOne({ where: { username: username }});
         const token = req.headers.authorization.split(' ').pop()
         const tokenData = await verifyToken(token);

         if (tokenData.userType === 'Admin-Access') {

            const AdminAccess = await Admin_access.findByPk(tokenData.id);

            AdminAccess.update({remember_token : null});
            AdminAccess.save();

            //let id = Object.values(AdminAccess)[1]["id"];
            let username = Object.values(AdminAccess)[1]["username"];
            //let active = Object.values(AdminAccess)[1]["active"];
            
            return res.status(200).json({
               error:false,
               statusCode: 200,
               msg: `User ${username} has been logged out`,
               data: AdminAccess
            });
         }

         if (tokenData.userType === 'Client-User') {

            const clientuser = await clientUser.findByPk(tokenData.id);
            clientuser.update({remember_token : null});
            clientuser.save();

            let username = Object.values(clientuser)[1]["username"];
            
            return res.status(200).json({
               error:false,
               statusCode: 200,
               msg: `User ${username} has been logged out`,
               data: clientuser
            });
         }
      }

      return res.status(400).json({
         error:true,
         statusCode: 400,
         msg: `User must be logged first`,
         data: []
      });

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         error: true,
         statusCode: 500,
         msg: `User cannot be logged out`,
         data: []
      });
   }
}

module.exports = {
   login,
   logout
}