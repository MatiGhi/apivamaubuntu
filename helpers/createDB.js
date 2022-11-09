const { Sequelize } = require("sequelize");

/*DB CONNECTION*/
require("dotenv").config();

const create_database_structure = async (db_conf_creator, nombre_db, firstData) => {
   
        //let db_conf_cluster = process.env.DB_CONF_CLUSTER+nombre_db

        let db_conf_cluster = process.env.DB_CONF_CLUSTER_PROD+nombre_db

        let db_con_cluster = new Sequelize(db_conf_cluster);

        try {

            let db_connection_creator = new Sequelize(db_conf_creator);

            let tran_creator = await db_connection_creator.transaction();

            let db_name_base = db_conf_creator["database"];

            let db_name_table_title = `Tables_in_${db_name_base}`;

            const dbConnection = async () => {
                try {
                    await db_connection_creator.authenticate();
                    console.log('Succesfully connection to Database! 🚀');
            
                } catch (err) {
                    console.log(err);
                }
            }

            dbConnection();

            let SQL = `SHOW TABLES FROM ${db_conf_creator.database}`;
            let query = await db_connection_creator.query(SQL);
            let resultTablas = query[0];

            let buf = "SET FOREIGN_KEY_CHECKS = 0;\n";

            let CONSTRAINTS = '';

            for (let i = 0; i < resultTablas.length; i++) {
                const val = resultTablas[i];

                if(val[db_name_table_title] === 'lartrst_'){    
                } else {
    
                    SQL = `SHOW CREATE TABLE ${db_conf_creator.database}.${val[db_name_table_title]}`;
                    query =  await db_connection_creator.query(SQL);
                    let resultShow = query;

                    for (let x = 0; x < resultShow[0].length; x++) {
                        const val2 = resultShow[0][x];
                        
                        let matches = (val2['Create Table']);

                        matches = matches.replace(/,\n[ ]*CONSTRAINT/,'\n CONSTRAINT');

                        if (matches){
                            let split = matches.split("\n");

                            for (let ind = 0; ind < split.length; ind++) {
                                let e = split[ind];

                                if(e.includes('CONSTRAINT')){
                                    CONSTRAINTS += `ALTER TABLE ${val[db_name_table_title]} ADD ${e.trim()};\n`;
                                } else {
                            
                                    if((split.length-1) == ind){
                                        buf += e +";\n";
                                    } else {
                                        buf += e +"\n";
                                    }
                                }
                            }
                        }
                    }
                }  
            }

            buf += CONSTRAINTS;
            buf += "SET FOREIGN_KEY_CHECKS = 1";

            SQL = `CREATE DATABASE ${nombre_db} CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci'`;

            await db_connection_creator.query(SQL,{transaction:tran_creator});

            await tran_creator.commit(); 

            const newDbConnection = async () => {
                try {
                    await db_con_cluster.authenticate();
                    console.log(`Succesfully connection to ${nombre_db}! 🚀`);
                } catch (err) {
                    console.log(err);
                }
            }

            newDbConnection();

            let queries = buf.split(";");

            queries.forEach(async e => {
                try {
                    await db_con_cluster.query(e);
                } catch (error) {
                    console.log(error);
                }
             });

            firstData.forEach(async valor => {
                try {
                    let q = `INSERT INTO ${nombre_db}.${valor} SELECT * FROM ${db_name_base}.${valor}`;
                    await db_con_cluster.query(q);
                } catch(error){
                    console.log(error)
                }
            });
        
        return [1,db_con_cluster]
            
        } catch (error) {
            console.log(error);
            await tran_creator.rollback();
            return 0
        }
}

module.exports = {
    create_database_structure
}