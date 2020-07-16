import { Sequelize, DataTypes } from 'sequelize';

import env from '../../config/environment';

// Override timezone formatting for MSSQL
if (env.database.type === 'mssql') {
    DataTypes.DATE.prototype._stringify = function _stringify(date: any, options: any) {
        return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
    };
}

const sequelize = new Sequelize(env.database.name, env.database.user, env.database.pass, {
    host: env.database.host,
    port: env.database.port,
    dialect: env.database.type,
    dialectOptions: {
        useUTC: true,
        options: {
            encrypt: true
        }
    },
    logging: false
});

export default sequelize;
