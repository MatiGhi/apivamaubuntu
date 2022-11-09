const { Joi, isSchema } = require('joi');

const validation = (schema) => {
    return (req, res, next) => {

        try {

            let requestBody = req.body;

            if (!requestBody) {
                res.status(400).json({
                    error: true,
                    statusCode: 400,
                    msg: `${req.body} is a mandatory field`,
                    data: []
                });            

            } else {

                const {error} = schema.validate(requestBody,{abortEarly: false});

                if(error){

                    const arrayError = (err) => {

                       const arrErr = [];

                       const a = Object.values(err)[1];

                       let arrLen = a.length;

                        for(let i=0; i <= arrLen-1; i++){
                            arrErr.push(Object.values(err)[1][i]['message']);
                        }

                        return arrErr
                    }

                    let fieldsError = arrayError(error);
                  
                    res.status(400).json({
                        error: true,
                        statusCode: 400,
                        msg: fieldsError,                             
                        data: []
                    });
                
                } else {
                    next();
                }
            }

        } catch (err) {
            console.log('error', err);
            res.status(400).json({
                error: true,
                msg: `Error`,
                data: []
            });
        }
    };
};

module.exports = {
    validation
}
