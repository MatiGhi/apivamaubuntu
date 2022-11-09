const path = require("path");
const env = require("dotenv").config({
  path: path.resolve(__dirname, `../env/.env.${process.env.NODE_ENV}`),
});

module.exports = {  
    DB_CONF_ADMIN: env.parsed.DB_CONF_ADMIN,
    DB_CONF_CREATOR_DIALECT: env.parsed.DB_CONF_CREATOR_DIALECT,
    DB_CONF_CREATOR_DATABASE: env.parsed.DB_CONF_CREATOR_DATABASE,
    DB_CONF_CREATOR_USERNAME: env.parsed.DB_CONF_CREATOR_USERNAME,
    DB_CONF_CREATOR_PASSWORD: env.parsed.DB_CONF_CREATOR_PASSWORD,
    DB_CONF_CREATOR_HOST: env.parsed.DB_CONF_CREATOR_HOST,
    DB_CONF_CLUSTER: env.parsed.DB_CONF_CLUSTER,
    PORT: env.parsed.PORT,
    SECRETORPRIVATEKEY: env.parsed.SECRETORPRIVATEKEY 
};
