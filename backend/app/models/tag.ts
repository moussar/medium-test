import { Model, DataTypes } from 'sequelize';
import Connection from '../config/db';

export default class Tag extends Model { }

Tag.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'tag',
    sequelize: Connection,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});
