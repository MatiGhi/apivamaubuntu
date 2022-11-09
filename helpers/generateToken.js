const jwt = require('jsonwebtoken');
require ("dotenv").config();

const genToken = async (id, userType) => {

    return new Promise((resolve, reject) => { 
 
        const payload = {id, userType};
 
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
             expiresIn: 3600
        }, (err, token) => {
             
             if(err){
                 reject("Token can't be generated!")
             } else {
                 resolve(token);
             }
         })
    })
 }


const tokenSign = async (user) => {
    return jwt.sign(
        {
            username: user.username,
        },
            process.env.SECRETORPRIVATEKEY,
        {
            expiresIn: '1h',
        }
    );
}

const TokenReSign = async (iat) => {
    return jwt.sign(
        {
            username: user.username,
        },
            process.env.SECRETORPRIVATEKEY,
        {
            expiresIn: '1h',
        }
    );
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.SECRETORPRIVATEKEY)
    } catch (error) {
        return null
    }
}

const decodeToken = (token) => {
    var base64Url = token.split('.')[1];
    var b64Encoded = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(Buffer.from(b64Encoded, 'base64').toString());
}

module.exports = {
    genToken,
    tokenSign,
    verifyToken,
    decodeToken
}