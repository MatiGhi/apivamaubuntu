/*IMPORTS*/
const { request, response } = require('express');
const { securePassword } = require('../helpers/securePassword');
const bcryptjs = require('bcryptjs');

/*MODELS*/
const {creatorTable} = require('../models/creator_table');
const {masterCluster} = require ('../models/master_cluster');

const getCreatorTable = async (req = Request, res = Response) => {

    try {

        const creatortable = await creatorTable.findAll();

        if(!creatortable){
            return res.status(404).json({
                error: true,
                statusCode: 404,
                msg: `This entity hasn't any register`,
                data: []
            });
        }

        return res.status(200).json({
            error: false,
            msg: "Data retrieved Successfully",
            data: creatortable
        });
        
    } catch (error) {
        return res.status(500).json({
            error: true,
            statusCode: 500,
            msg: `Request Cannot be reached`,
            data: []
        });
    }
}

const getOneCreatorTable = async (req = request, res = response) => {

    const { id } = req.params;

    try {

        let _id = Number(id);

        const creatortable = await creatorTable.findByPk(_id); 

        if (!creatortable) {
            return res.status(400).json({
                error: true,
                statusCode: 400,
                msg: `Don't exist a Creator Table registered with id ${_id}`,
                data: []
            });
        }

            return res.status(200).json({
                error: false,
                statusCode: 200,
                msg: "Data retrieved Successfully",
                data: creatortable
            })
        
    } catch (error) {
        return res.status(500).json({
            error: true,
            statusCode: 500,
            msg: 'Request Cannot be reached',
            data: []
        }); 
    }
} 

const postCreatorTable = async (req, res = response) => {

    const { username, password, id_cluster, master_db } = req.body;

    try {

       const mastercluster = await masterCluster.findByPk(id_cluster);

        if (!mastercluster){
            return res.status(400).json({
                error: true,
                statusCode: 400,
                msg: `Master Cluster ${ip_cluster} doesn't exist`,
                data: []
            });
        }

        let hashedPass = securePassword(password);

        const creatortable = await creatorTable.create({
            username, 
            hashedPass, 
            id_cluster, 
            master_db
        });

        return res.status(200).json({
            error: false,
            statusCode: 200,
            msg:`new Master Cluster has been Created`,
            data: creatortable
        });

    } catch (error) {

        return res.status(500).json({
            error: true,
            statusCode: 500,
            msg: 'Creator Table cannot be Created',
            data:[]
        }); 
    }
} 

const putCreatorTable = async (req, res = response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        if(Object.keys(body).length === 0){
            return res.status(400).json({
                error: true,
                statusCode: 400,
                msg: `Body cannot be empty`,
                data: []
            });
        }

        let _id = Number(id);

        let creatortable = await creatorTable.findByPk(_id);

        if (!creatortable){
            return res.status(400).json({
                error: true,
                statusCode: 400,
                msg: `Don't exist a Master Cluster registered with id ${_id}`,
                data: []
            });
        }

        //const { username, password, id_cluster, master_db } = req.body;

        (body.username) ? creatortable.username = body.username : true;
        (body.password) ? creatortable.password = securePassword(body.ip_cluster) : true;
        (body.id_cluster) ? creatortable.id_cluster = body.id_cluster : true;
        (body.master_db) ? creatortable.master_db = body.master_db : true;

        await creatortable.update();

        await creatortable.save();

        return res.status(200).json({
            error: false,
            statusCode: 200,
            msg: `Creator Table number ${_id} has been Updated`,
            data: creatortable
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            statusCode: 500,
            msg: 'Client User cannot be Updated!',
            data: []
        })    
    }   
}

const deleteCreatorTable = async (req, res = response) => {

    const {id} = req.params;

    try {

        let _id = Number(id);

        const creatortable = await creatorTable.findByPk(_id);

        if (!creatortable) {
            return res.status(400).json({
                error: true,
                statusCode: 400,
                msg: `Don't exist a Creator Table registered with id ${_id}`,
                data: []
            });
        }

        //await creator.update({ deleted_at: new Date()});
        //await mastercluster.save();

        return res.status(200).json({
            error: false,
            statusCode: 200,
            msg: `Creator Table number ${_id} has been Deleted`,
            data: mastercluster
        })

    } catch (error) {
        return res.status(500).json({
            error: true,
            statusCode: 500,
            msg: 'Creator Table cannot be Deleted',
            data: []
        })   
    }
}

module.exports = {
    getCreatorTable,
    getOneCreatorTable,
    postCreatorTable,
    putCreatorTable,
    deleteCreatorTable
}

