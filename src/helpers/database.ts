import knex from 'knex';
import env from '../../config/environment';

const database = knex({
    client: env.db_ecomSQL.type,
    connection: {
        host: env.db_ecomSQL.host,
        user: env.db_ecomSQL.user,
        password: env.db_ecomSQL.pass,
        port: parseInt(env.db_ecomSQL.port),
        database: env.db_ecomSQL.name,
        connectionTimeout: 15000,
        requestTimeout: 60000,
        options: {
            encrypt: true
        }
    }
});

export default database;
