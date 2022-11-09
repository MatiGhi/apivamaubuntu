const {Sequelize} = require('sequelize');
const md5 = require('md5');
const { rand } = require('../helpers/rand');

require("dotenv").config();

let microtime = Math.round(new Date().getTime()/1000);

const insert_database_user = async (id_cluster, db_con_creator, db_conf_admin, nombre_db, id_client, domain) => {

    const db_connection_admin = await new Sequelize(db_conf_admin);

    try {

        let tran_admin = await db_connection_admin.transaction();

        let inicio = rand(0,26);

        let random = md5(microtime).substring(inicio,inicio+5);

        const USER = `${domain}${random}`;

        random = md5(microtime).substring(inicio,inicio+20);

        const PASSWORD = random;

        let db_conn_creator = await new Sequelize(db_con_creator);

        const dbConCreator = async () => {
            try {
                await db_conn_creator.authenticate();
                console.log(`Succesfully connection to ${nombre_db}! 🚀`);
            } catch (err) {
                console.log(err);
            }
        }

        dbConCreator();

        let SQL = `CREATE USER '${USER}'@'${nombre_db}' IDENTIFIED BY '${PASSWORD}'`;

        await db_conn_creator.query(SQL);

        SQL = `GRANT ALL PRIVILEGES ON ${nombre_db}.* TO '${USER}'@'${nombre_db}' WITH GRANT OPTION`;

        await db_conn_creator.query(SQL,{transaction:tran_admin});

        const dbConAdmin = async () => {
            try {
                await db_connection_admin.authenticate();
                console.log(`Succesfully connection to ${nombre_db}! 🚀`);
            } catch (err) {
                console.log(err);
            }
        }

        dbConAdmin();

        SQL = `INSERT INTO cluster_clients_config(id_cluster, id_client, db_name, db_user, db_password, createdAt, deleted_at) values ('${id_cluster}','${id_client}','${nombre_db}','${USER}','${PASSWORD}',${null},${null})`;

        await db_connection_admin.query(SQL,{transaction: tran_admin});

        return 1

    } catch (error) {
        console.log(error);
        return 0
    }
}

module.exports = {
    insert_database_user
}