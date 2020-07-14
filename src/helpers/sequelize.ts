import { Sequelize, DataTypes } from 'sequelize';

import env from '../../config/environment';

// Override timezone formatting for MSSQL
DataTypes.DATE.prototype._stringify = function _stringify(date: any, options: any) {
    return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};

const sequelize = new Sequelize(env.db_ecomSQL.name, env.db_ecomSQL.user, env.db_ecomSQL.pass, {
    host: env.db_ecomSQL.host,
    port: env.db_ecomSQL.port,
    dialect: env.db_ecomSQL.type,
    dialectOptions: {
        useUTC: true,
        options: {
            encrypt: true
        }
    },
    logging: false
});

export default sequelize;
