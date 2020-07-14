import { DataTypes, Optional, Model } from 'sequelize';

import sequelize from '../helpers/sequelize';

interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: number;
    resetGUID: string;
    deleted: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'roles' | 'resetGUID' | 'deleted'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserCreationAttributes {

    // Attributes
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public roles!: number;
    public resetGUID!: string;
    public deleted!: boolean;

    // Timestamps
    public readonly created!: Date;
    public readonly updated!: Date;

}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            field: 'first_name',
            type: DataTypes.STRING(50),
            allowNull: false
        },
        lastName: {
            field: 'last_name',
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        roles: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        resetGUID: {
            field: 'reset_guid',
            type: DataTypes.UUIDV1,
            allowNull: false
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        sequelize,
        tableName: 'users',
        defaultScope: {
            attributes: {
                exclude: ['password', 'resetGUID']
            },
            where: {
                deleted: false
            }
        },
        createdAt: 'created',
        updatedAt: 'updated'
    }
);

export default User;
