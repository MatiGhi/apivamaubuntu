

const { verifyToken, decodeToken } = require('../utils/genToken');
/*MODELS*/
const { User } = require('../../models/backendClients/users');
const { UserRole } = require('../../models/backendClients/users_roles');
const { RolePermissions } = require('../../models/backendClients/roles_permissions');
const { MasterPermissions } = require('../../models/backendClients/master_permissions');

const checkPermissions = async (req = request, res = response, next) => {

    try {

        if (req.headers.authorization !== undefined){
            
            const token = req.headers.authorization.split(' ').pop()
            const tokenData = await verifyToken(token);
        
            if(tokenData !== null && tokenData.username){

                //with token get user, get roles, get permissions, check permission
                //En que base de datos buscar? tendría que haber estos datos en la sesión que se guarde desde el login. ¿passport para sesiones?
                //Esto me lleva a pensar sobre el timeout de la sesión, que ahor afunciona por token ok.
                //Además del usuario, creo que gusradaría el id de usuario y el tipo de usuario (si es admin o no admin  o si exite en la tabla de usuarios de cada bbdd) 

                const user = await User.findOne({ where: { id: tokenData.id } });
                const permission = await MasterPermissions.findOne({ where: { endpoint: req.path } });
                

                if (user && permission){
                    const user_role = await UserRole.findOne({ where: { id_user: tokenData.id } });
                    if (user_role){
                        const roles_permission = await RolePermissions.findOne({ where: { id_role: user_role.id, id_permission: permission.id_permission } });
                        if (roles_permission){
                            next();
                        }else{
                            return res.status(409).json({
                                error: true,
                                statusCode: 409,
                                msg: `No tienes permisos de usuario.`,
                                data: []
                            });
                        }        
                        
                    }else{
                        return res.status(409).json({
                            error: true,
                            statusCode: 409,
                            msg: `Error en la sesión de usuario.`,
                            data: []
                        });
                    }   
                }else{
                    return res.status(409).json({
                        error: true,
                        statusCode: 409,
                        msg: `Error en la sesión de usuario.`,
                        data: []
                    });
                }               
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
        return res.status(500).json({
            error: true,
            statusCode: 500,
            msg: `Internal Server Error`,
            data: []
        });
    }
}

module.exports = {
    checkPermissions
}