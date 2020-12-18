import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.' + process.env.NODE_ENV });

const Connection = new Sequelize(process.env.PGDB, process.env.PGUSER, process.env.PGPWD, {
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT),
  dialect: 'postgres', // explicitly supplied
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false,
  dialectOptions: {
    connectTimeout: 60000
  },
  define: {
    underscored: true
  }
});

export default Connection;

