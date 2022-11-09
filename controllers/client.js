/*LIBRARIES*/
const md5 = require('md5');
const sequelizeDatatable = require('node-sequelize-datatable');

/*DB CONNECTION*/
require("dotenv").config();

/*IMPORTS*/
const { request, response } = require('express');
const { sequelize, dbConnectMySql } = require("../DB/connection");
const { securePassword } = require('../helpers/securePassword');

const { Ok, Error, NotFound } = require("../utils/httpResponse");

const {
    getClientsService,
    getFilterClientService,
    getOneClientService,
    putClientService,
    deleteClientService,
  } = require("../services/client");

/*MODELS*/
const { Admin_access } = require('../models/admin_access');
const { Client } = require('../models/client');
const { clientUser } = require('../models/clientuser');
const { clientUserNoAdmin } = require('../models/clientuser_noadmin');
const { masterCluster } = require('../models/master_cluster'); 
const { creatorTable } = require('../models/creator_table');

/*HELPERS*/
const { create_database_structure } = require('../helpers/createDB');
const { insert_database_user } = require('../helpers/createUser');

const getClients = async (req, res) => {
    try {
      const client = await getClientsService();
      return Ok(res, "Data retrieved successfully", client);
    } catch (error) {
      return Error(res, error.message ? error.message : "General Error");
    }
};

const getFilterClient = async (req = request, res = response) => {
    const { body } = req;

    try {
        const client = await getFilterClientService(body);
        return Ok(res, "Data retrieved successfully", client);
    } catch (error) {
        return Error(res, error.message ? error.message : "Data cannot be retrieved");
    }
}

const getOneClient = async (req, res) => {
    const { id } = req.params;
  
    try {
      const client = await getOneClientService(id);
      return client
        ? Ok(res, "Data retrieved successfully", client)
        : NotFound(res, "Client is not found");
    } catch (error) {
      return Error(res, error.message ? error.message : "General Error");
    }
  };

/*const getOneClient = async (req = request, res = response) => {

    const { id } = req.params;

    try {

        let _id = Number(id);

        const client = await Client.findByPk(_id); 

        if (!client) {
            return res.status(400).json({
                error: true,
                statusCode: 400,
                msg: `Don't exist a Client registered with id ${_id}`,
                data: []
            });
        }

            res.status(200).json({
                error: false,
                statusCode: 200,
                msg: "Data retrieved Successfully",
                data: client
            })
        
    } catch (error) {
        res.status(500).json({
            error: true,
            statusCode: 500,
            msg: 'Client cannot be retrieved',
            data: []
        }); 
    }
} */

const postClient = async (req, res = response) => {

    const { business_name, 
            domain, 
            email, 
            phone, 
            nif_cif, 
            address, 
            country,
            state,
            province, 
            town,
            id_cluster
            } = req.body;
        
    let t = await sequelize.transaction();

    try {

       const _email = await Client.findOne({ where: { email: email } });

        if (_email){

            let err = `Email ${email}`;

            throw new Error(err);
        }

       const existClient = await Client.findOne({ where: { domain: domain } });

       if (existClient){

            let err = `Domain ${domain}`;

            throw new Error(err);
       }

       if ((domain === 'admin')){

            let err = `Domain ${domain}`;

            throw new Error(err);
        }

        if(typeof(id_cluster) === 'string'){
            let err = `Typeof ${id_cluster}`;
            throw new Error(err);
        }

        let cluster = await masterCluster.findByPk(id_cluster);

        if(!cluster){
            let err = `Cluster ${id_cluster}`;
            throw new Error(err);
        }

        let creatortable = await creatorTable.findOne({ where : { id_cluster : id_cluster }});

        if (!creatortable){
            let err = `Creator ${id_cluster}`;
            throw new Error(err);
        }

        let username = "admin@"+ domain;

        const adminAcces_usrName = await Admin_access.findByPk(username); 
        
        const clientuser_usrName = await clientUser.findOne({ where: { username: username }});

        const clientuserNoAdmin_usrName = await clientUserNoAdmin.findOne({ where: { username: username }});
     
        if((adminAcces_usrName) || (clientuser_usrName) || (clientuserNoAdmin_usrName)){   

           let err = `Username ${username}`;

           throw new Error(err);
        }

        const client = await Client.create({business_name, 
            domain, 
            email, 
            phone, 
            nif_cif, 
            address, 
            country,
            state,
            province, 
            town,
            id_cluster
        },{transaction: t});

        let password = securePassword("@dm1n_p455w0rd");

        let name = Object.values(client)[1]["business_name"];

        let client_id = Object.values(client)[1]["id"];

        const clientuser = await clientUser.create({
            username, 
            password, 
            name, 
            email, 
            client_id
        }, {transaction: t});

        let SQL = `SELECT  
                master_cluster.ip_cluster,  
                master_cluster.port_cluster,
                creator_table.username,
                creator_table.password,
                creator_table.master_db
            FROM  
                master_cluster
            JOIN creator_table on creator_table.id_cluster=master_cluster.id_cluster
            WHERE 
                master_cluster.id_cluster = ${id_cluster}`;

        let execSQL = await sequelize.query(SQL);
        
        let newConnection = '';

        execSQL[0].forEach(e => {

            newConnection = `mysql://${e.username}:${e.password}@${e.ip_cluster}/${e.master_db}`;

            return newConnection

        });

    let db_conf_creator = {
        database:process.env.DB_CONF_CREATOR_PROD_DATABASE,
        username:process.env.DB_CONF_CREATOR_PROD_USERNAME,
        password:process.env.DB_CONF_CREATOR_PROD_PASSWORD,
        host:process.env.DB_CONF_CREATOR_PROD_HOST,
        dialect:process.env.DB_CONF_CREATOR_PROD_DIALECT
    }

    let microtime = Math.round(new Date().getTime()/1000);

    function rand(min, max) {
        return Math.random() * (max - min) + min;
    }
  
    let inicio = rand(0,26);

    let random = md5(microtime).substring(inicio,inicio+5);

    let nombre_db = `${Object.values(client)[1]["domain"]}_${random}`;

    let createDBSchema = await create_database_structure(db_conf_creator,nombre_db,['master_permissions','master_permissions_blocks']);

    if (createDBSchema === 0){

        let err = `Create ${nombre_db}`;
        throw new Error(err);
    }

    let db_con_creator = newConnection;


   //let db_conf_admin = process.env.DB_CONF_ADMIN;

   let db_conf_admin = process.env.DB_CONF_ADMIN_PROD;

    let createDBUser = await insert_database_user(id_cluster, db_con_creator, db_conf_admin, nombre_db, client_id, domain);

    if (createDBUser === 0){
        
        let err = `DBUser ${nombre_db}`;

        let DROP_DATABASE_SQL = `DROP DATABASE ${nombre_db}`;
        let DELETE_CLIENT_SQL = `DELETE from clients WHERE id = ${client_id}`;
        let DELETE_CLIENTUSER_SQL = `DELETE from clientsusers WHERE client_id = ${client_id}`;

        await createDBSchema[1].query(DROP_DATABASE_SQL);
        await sequelize.query(DELETE_CLIENT_SQL);
        await sequelize.query(DELETE_CLIENTUSER_SQL);

        throw new Error(err);
    }

    await t.commit(); 

    res.status(200).json({
        error: false,
        statusCode: 200,
        msg:`new Client and Client User have been Created`,
        data: [client, clientuser]
    });

    } catch (error) {

        console.log(error);

        await t.rollback();

        let errMsg = error.message.split(" ");

        if (errMsg[0] === 'Email'){
            return res.status(400).json({
                    error: true,
                    statusCode: 400,
                    msg: `Email ${errMsg[1]} is already in use`,
                    data: []
                }
            ) 
        }

        if (errMsg[0] === 'Domain'){
            return res.status(400).json({
                    error: true,
                    statusCode: 400,
                    msg: `Domain ${errMsg[1]} is already in use`,
                    data: []
                }
            ) 
        }

        if (errMsg[0] === 'Typeof'){
            return res.status(400).json({
                error: true,
                statusCode: 400,
                msg:`Cluster must be a type of Number`,
                data: []
            });
        }

        if(errMsg[0] === 'Cluster'){
            return res.status(400).json({
                error: true,
                statusCode: 400,
                msg:`Cluster ${errMsg[1]} don't exist`,
                data: []
            });
        }

        if(errMsg[0] === 'Creator'){
            return res.status(400).json({
                error: true,
                statusCode:400,
                msg:`Creator Table ${errMsg[1]} don't exist`,
                data: []
            });
        }

        if (errMsg[0] === 'Username'){
            return res.status(400).json({
                    error: true,
                    statusCode: 400,
                    msg: `Username ${errMsg[1]} is already in use`,
                    data: []
                }
            ) 
        }

        if (errMsg[0] === 'Create'){
            return res.status(400).json({
                    error: true,
                    statusCode: 400,
                    msg: `Database ${errMsg[1]} cannot be Created`,
                    data: []
                }
            ) 
        }

        if (errMsg[0] === 'DBUser'){
            return res.status(400).json({
                    error: true,
                    statusCode: 400,
                    msg: `DBUser ${errMsg[1]} cannot be Created`,
                    data: []
                }
            ) 
        }

        res.status(500).json({
            error: true,
            statusCode: 500,
            msg: 'Client cannot be Created',
            data:[]
        });
    }
} 

const putClient = async (req, res) => {
    const { id } = req.params;
    const {
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
    } = req.body;
  
    const client = {
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
    };
  
    try {
      const updatedClient = await putClientService(client);
  
      return Ok(res, "Client has been Updated!", updatedClient);
    } catch (error) {
      return Error(
        res,
        error.message ? error.message : "Client cannot be Updated"
      );
    }
  };

const deleteClient = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedClient = await deleteClientService(id);
  
      return Ok(res, "Client has been Deleted!", deletedClient);
    } catch (error) {
      return Error(
        res,
        error.message ? error.message : "Client cannot be Deleted"
      );
    }
  };

const blockClient = async (req, res = response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        let _id = Number(id);
        let blocked = Number(body.blocked);

        if (blocked !== undefined) {
        
            const client = await Client.findByPk(_id); 

            if (!client) {
                return res.status(400).json({
                    error: true,
                    statusCode: 400,
                    msg: `Don't exist a Client registered with id ${_id}`,
                    data: []
                });
            }

            if(blocked === 1){

                client.active = 0;

                await client.update();
                await client.save();

                return res.status(200).json({
                    error: false,
                    statusCode: 200,
                    msg: `Client ${id} has been Blocked`,
                    data: client
                });

            } else if (blocked === 0){

                client.active = 1;

                await client.update();
                await client.save();

                return res.status(200).json({
                    error: false,
                    statusCode: 200,
                    msg: `Client ${id} has been Unblocked`,
                    data: client
                })
            }
        } 

        return res.status(500).json({
            error: true,
            statusCode: 400,
            msg: `Body cannot be empty`,
            data: []
        })
        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: true,
            statusCode: 500,
            msg: 'Client cannot be Blocked/Unblock',
            data: []
        })   
    }
}

module.exports = {
    getClients,
    getFilterClient,
    getOneClient,
    postClient,
    putClient,
    blockClient,
    deleteClient
}

