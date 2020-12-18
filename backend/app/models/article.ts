import { Model, DataTypes } from 'sequelize';
import Connection from '../config/db';
import User from './user';
import Comment from './comment';

export default class Article extends Model { }

Article.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    reference: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    draft: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    }
}, {
    defaultScope: {
        include: [{
            model: User,
            duplicating: false,
            as: 'user',
            attributes: ['username'],
        },
        {
            model: Comment,
            duplicating: false,
            as: 'comments',
            //attributes: ['username'],
        }],
    },

    tableName: 'article',
    sequelize: Connection,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Article.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id', as: 'user' });
Article.hasMany(Comment, { as: 'comments' });
