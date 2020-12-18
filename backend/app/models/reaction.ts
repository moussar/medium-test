import { Model, DataTypes } from 'sequelize';
import Connection from '../config/db';

export default class Reaction extends Model { }

Reaction.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    article_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'article',
            key: 'id'
        }
    },
}, {
    tableName: 'reaction',
    sequelize: Connection,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});
