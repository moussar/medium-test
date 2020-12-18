import { Model, DataTypes } from 'sequelize';
import Connection from '../config/db';

export default class User extends Model {
    public password: string;
    public generate = async function (UserId) {
        if (!UserId) {
            throw new Error('Token requires a user ID')
        }

        let token = '';

        const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
            'abcdefghijklmnopqrstuvwxyz0123456789' + '@$';

        for (var i = 0; i < 64; i++) {
            token += possibleCharacters.charAt(
                Math.floor(Math.random() * possibleCharacters.length)
            );
        }
        return token;
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'member'

    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    scopes: {
        withoutPassword: {
            attributes: { exclude: ['password', 'token'] },
        }
    },
    omitNull: true,
    tableName: 'user',
    sequelize: Connection,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});