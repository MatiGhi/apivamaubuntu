/*LIBRARIES*/
const md5 = require('md5');
const crypto = require('crypto');

/*DB CONNECTION*/
require("dotenv").config();

/*IMPORTS*/
const { request, response } = require('express');
const fileUpload = require('express-fileupload');
var ftp = require("easy-ftp");
const { sequelize, dbConnectMySql } = require("../DB/connection");
const { decodeToken } = require('../helpers/generateToken');

/*MODELS*/
const { Video } = require('../../models/backendClients/videos');

const sequelizeDatatable = require('node-sequelize-datatable');

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

const getVideos = async (req = request, res = response) => {

    try {

        const videos = await Video.findAll();

        res.status(200).json({
            error: false,
            statusCode: 200,
            msg: "Data retrieved Successfully",
            data: videos
        });
        
    } catch (error) {
        
        res.status(500).json({
            error: false,
            statusCode: 500,
            msg: "Clients cannot been retrieved",
            data: []
        });
    }
}

const getFilterVideos = async (req = request, res = response) => {

    const { body } = req.body;

    try {
        
        let datatableObj = await sequelizeDatatable(req.body);

        let videos = await Video.findAndCountAll(datatableObj);

        return res.status(200).json({
            error: false,
            statusCode: 200,
            msg: "Data retrieved Successfully",
            data: videos
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: true,
            statusCode: 500,
            msg: "Data Cannot be retrieved",
            data: []
        });
    }
}

const getOneVideo = async (req = request, res = response) => {

    const { id } = req.params;

    try {

        let _id = Number(id);

        const video = await Video.findByPk(_id); 

        if (!video) {
            return res.status(400).json({
                error: true,
                statusCode: 400,
                msg: `Don't exist a Video registered with id ${_id}`,
                data: []
            });
        }

            res.status(200).json({
                error: false,
                statusCode: 200,
                msg: "Data retrieved Successfully",
                data: video
            })
        
    } catch (error) {
        res.status(500).json({
            error: true,
            statusCode: 500,
            msg: 'Video cannot be retrieved',
            data: []
        }); 
    }
} 

const postVideo = async (req, res = response) => {

    const { title, 
            owner, 
            start_time            
            } = req.body;
        
    let t = await sequelize.transaction();

    try {

        //get user_id from session or json token
        //Calculate fingerprint_sha256
        //Validate Owner
        //Serialize filename
        //If owner is empty asume that he is user_id by default
        //FTP System
        //let newConnection = `mysql://${e.username}:${e.password}@${e.ip_cluster}/${e.master_db}`;

        let token_front = req.headers.authorization;
        const JSONToken = decodeToken(token_front);
        const user_id = Object.values(JSONToken)[2];
        
        if (!owner || !start_time || !title) {
            return NotFound(res, "Title, start_time and owner can not be empty");
          }
        if(!req.files) {
            let err = `File`;
            throw new Error(err);
        } 

        let video_uploaded = req.files.video_uploaded;

        let filename = "";
        let  today 		= new Date();
        let  dd 		= String(today.getDate()).padStart(2, '0');
        let  mm 		= String(today.getMonth() + 1).padStart(2, '0');
        let  yyyy 		= today.getFullYear();
        let microtime = Math.round(today.getTime()/1000);
        filename = "video_" + user_id + "_" + yyyy + mm + dd + "_" + microtime;

        //Encription vídeo for save? Streaming problem?
        //A buffer representation of the uploaded file
        //video_uploaded.data;
        //video_uploaded.mv('./uploads/' + video_uploaded.name);
        //video_uploaded.name;
        let mimetype = video_uploaded.mimetype;
        let videosize = video_uploaded.size

        const hashSum = crypto.createHash('sha256');
        hashSum.update(video_uploaded.data);

        let fingerprint_sha256  = hashSum.digest('hex');
        video_uploaded.mv('./temp/' + filename);

        var config = {
            host: "127.0.0.1",
            type: "FTP",
            port: "",
            username: "admin",
            password: "",
          };
          
        ftp.connect(config);

        ftp.upload(file.tempFilePath, "/test", function (err) {
            if (err) {
              console.log(err);
              return res.status(500).send(err);
            } else {
              console.log("finished:", res);
              res.json({ fileName: file.name, filePath: `/upload/${file.name}` });
            }
            ftp.close();
          });

          //Delete file temp 

        const video = await Video.create({title, 
            filename, 
            user_id, 
            owner, 
            start_time, 
            fingerprint_sha256,
            videosize,
            mimetype
        },{transaction: t});       
      

    await t.commit(); 

    res.status(200).json({
        error: false,
        statusCode: 200,
        msg:`new Video have been Created`,
        data: []
    });

    } catch (error) {

         //Delete file temp and delete file from server ftp if exist

        console.log(error);

        await t.rollback();

        let errMsg = error.message.split(" ");

        if (errMsg[0] === 'File'){
            return res.status(400).json({
                    error: true,
                    statusCode: 400,
                    msg: `No file uploaded`,
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

const putClient = async (req, res = response) => {

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

        let client = await Client.findByPk(_id);

        if (!client) {
            return res.status(400).json({
                error: true,
                statusCode: 400,
                msg: `Don't exist a Client registered with id ${_id}`,
                data: []
            });
        }

        if(body.domain){
            return res.status(400).json({
                error: true,
                statusCode: 400,
                msg: `It's not allowed to modify the domain`,
                data: []
            });
        }


        (body.bussinesname) ? client.bussinesname = body.bussinesname : true;
        (body.phone) ? client.phone = body.phone : true;
        (body.email) ? client.email = body.email : true;
        (body.nif_cif) ? client.nif_cif = body.nif_cif : true;
        (body.address) ? client.address = body.address : true;
        (body.country) ? client.country = body.country : true;
        (body.state) ? client.state = body.state : true;
        (body.province) ? client.province = body.province : true;
        (body.town) ? client.town = body.town : true;

        await client.save();

        return res.status(200).json({
            error: false,
            statusCode: 200,
            msg: `Client number ${_id} has been Updated`,
            data: client
        });

    } catch (error) {
        res.status(500).json({
            error: true,
            statusCode: 500,
            msg: 'Client cannot be Updated!',
            data: []
        })    
    }   
}

const deleteClient = async (req, res = response) => {

    const {id} = req.params;

    try {

        let _id = Number(id);

        let client = await Client.findByPk(_id);

        if (!client) {
            return res.status(400).json({
                error: true,
                statusCode: 400,
                msg: `Don't exist a Client registered with id ${_id}`,
                data: []
            });
        }
        await client.update({active: 0, deleted_at: new Date()});
        await client.save();

        //await AdminAccess.destroy();

        res.status(200).json({
            error: false,
            statusCode: 200,
            msg: `Client number ${_id} has been Deleted`,
            data: client
        })

    } catch (error) {
        res.status(500).json({
            error: true,
            statusCode: 500,
            msg: 'Client cannot be Deleted',
            data: []
        })   
    }
}


module.exports = {
    getVideos,
    getFilterVideos,
    getOneVideo,
    postVideo,
    putVideo,
    deleteVideo
}

