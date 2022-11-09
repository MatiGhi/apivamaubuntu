const { verifyToken, decodeToken } = require('../helpers/generateToken');
const { diffDate } = require('../helpers/diffDate');

const checkAuth = async (req = request, res = response, next) => {

    try {

        if (req.headers.authorization !== undefined){

            const token = req.headers.authorization.split(' ').pop()
            const tokenData = await verifyToken(token);

            if (tokenData !== null){

                let token_front = req.headers.authorization;
                const currentDate = new Date();
                const JSONToken = decodeToken(token_front);
                console.log("JSONToken");
                console.log(JSONToken);
                let expProp = Object.values(JSONToken)[2];
                let expDate = new Date(expProp * 1000);

                let tokenExpired = diffDate(currentDate, expDate);
    
                /*let currentDate = (new Date().getTime())/1000;

                console.log("currentDate");
                console.log(currentDate);
                console.log("tokenData.exp");
                console.log(tokenData.exp);
                console.log("tokenData.iat");
                console.log(tokenData.iat);*/

                if (tokenExpired < 0){
                //if (tokenData.iat < currentDate ){    
                //if (tokenData.exp < currentDate ){  
                    return res.status(401).json({
                        error: true,
                        statusCode: 401,
                        msg: `Unauthorized: Token has Expired`,
                        data: []
                    });
                }

                //tokenData.iat += ((new Date().getTime())/1000)+3600; 
                tokenData.exp += ((new Date().getTime())/1000)+3600; 
            }

            if(tokenData !== null && tokenData.id){    
                next();
            } else {
                return res.status(409).json({
                    error: true,
                    statusCode: 409,
                    msg: `Unauthorized: Invalid Token. Please Try Login again.`,
                    data: []
                });
            }

        } else {

             return res.status(409).json({
                error: true,
                statusCode: 409,
                msg: `Unauthorized: Missing Permissions`,
                data: []
             });
        }

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            error: true,
            statusCode: 401,
            msg: `Invalid Token`,
            data: []
        });
    }
}

module.exports = {
    checkAuth
}