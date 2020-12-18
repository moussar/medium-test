import { Model, DataTypes } from 'sequelize';
import Connection from '../config/db';
import User from './user';

export default class Comment extends Model { }

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
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
    defaultScope: {
        include: [{
            model: User,
            duplicating: false,
            as: 'user',
            attributes: ['username'],
        }],
    },
    tableName: 'comment',
    sequelize: Connection,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});


Comment.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id', as: 'user' });
