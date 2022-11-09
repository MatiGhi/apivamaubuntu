/*IMPORTS*/
const { request, response } = require('express');

/*MODELS*/
const {masterCluster} = require('../models/master_cluster');

const getMasterCluster = async (req = Request, res = Response) => {

    try {

        const mastercluster = await masterCluster.findAll();

        if(!mastercluster){
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
            data: mastercluster
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

const getOneMasterCluster = async (req = request, res = response) => {

    const { id } = req.params;

    try {

        let _id = Number(id);

        const mastercluster = await masterCluster.findByPk(_id); 

        if (!mastercluster) {
            return res.status(400).json({
                error: true,
                statusCode: 400,
                msg: `Don't exist a Master Cluster registered with id ${_id}`,
                data: []
            });
        }

            return res.status(200).json({
                error: false,
                statusCode: 200,
                msg: "Data retrieved Successfully",
                data: mastercluster
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

const postMasterCluster = async (req, res = response) => {

    const { nombre_cluster, ip_cluster, port_cluster, desc_cluster } = req.body;

    try {

       const ipcluster = await masterCluster.findOne({ where: { ip_cluster: ip_cluster } });

        if (ipcluster){
            return res.status(400).json({
                error: true,
                statusCode: 400,
                msg: `ip_cluster ${ip_cluster} is already in use`,
                data: []
            });
        }

        const mastercluster = new masterCluster({nombre_cluster, ip_cluster, port_cluster, desc_cluster});

        await mastercluster.save();

        return res.status(200).json({
            error: false,
            statusCode: 200,
            msg:`new Maser Cluster has been Created`,
            data: clientuser
        });

    } catch (error) {

        return res.status(500).json({
            error: true,
            statusCode: 500,
            msg: 'Master Cluster Cannot be Created',
            data:[]
        }); 
    }
} 

const putMasterCluster = async (req, res = response) => {

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

        let mastercluster = await masterCluster.findByPk(_id);

        if (!mastercluster) {
            return res.status(400).json({
                msg: `Don't exist a Master Cluster registered with id ${_id}`
            });
        }

        (body.nombre_cluster) ? mastercluster.nombre_cluster = body.nombre_cluster : true;
        (body.ip_cluster) ? mastercluster.ip_cluster = body.ip_cluster : true;
        (body.port_cluster) ? mastercluster.port_cluster = body.port_cluster : true;
        (body.desc_cluster) ? mastercluster.desc_cluster = body.name : true;

        await mastercluster.update();

        await mastercluster.save();

        res.status(200).json({
            error: false,
            statusCode: 200,
            msg: `Master Cluster number ${_id} has been Updated`,
            data: mastercluster
        });

    } catch (error) {
        res.status(500).json({
            error: true,
            statusCode: 500,
            msg: 'Client User cannot be Updated!',
            data: []
        })    
    }   
}

const deleteMasterCluster = async (req, res = response) => {

    const {id} = req.params;

    try {

        let _id = Number(id);

        const mastercluster = await masterCluster.findByPk(_id);

        if (!mastercluster) {
            return res.status(400).json({
                msg: `Don't exist a Master Cluster registered with id ${_id}`
            });
        }

        await mastercluster.update({deleted_at: new Date()});

        await mastercluster.save();

        return res.status(200).json({
            error: false,
            msg: `Master Cluster number ${_id} has been Deleted`,
            data: mastercluster
        })

    } catch (error) {
        return res.status(500).json({
            error: true,
            statusCode: 500,
            msg: 'Master Cluster cannot be Deleted',
            data: []
        })   
    }
}

module.exports = {
    getMasterCluster,
    getOneMasterCluster,
    postMasterCluster,
    putMasterCluster,
    deleteMasterCluster
}

