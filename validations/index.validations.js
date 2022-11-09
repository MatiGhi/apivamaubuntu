const loginVal = require('./login.validator');
const accessAdminValidation = require('./admin_access.validator');
const clientValidation = require('./client.validator');
const clientUserValidation = require('./clientuser.validator');
const clientUserNoAdminValidation = require('./clientuser_noadmin.validator');

/*PUT Validations*/
const accessAdminPutValidation = require('./putValidations/admin_access.put.validator');
const clientPutValidation = require("./putValidations/client.put.validator");
const clientUserPutValidation = require('./putValidations/clientuser.put.validator');
const clientUserNoAdminPutValidation  = require('./putValidations/clientuserNoAdmin.put.validator');

module.exports = {
    loginVal,
    accessAdminValidation,
    clientValidation,
    clientUserValidation,
    clientUserNoAdminValidation,
    accessAdminPutValidation,
    clientUserNoAdminPutValidation,
    clientPutValidation,
    clientUserPutValidation
}