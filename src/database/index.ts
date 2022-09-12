import { DataSource } from 'typeorm';
import {
  NODE_ENV,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
} from '@src/config/env';

export const dataSource: DataSource = new DataSource({
  name: NODE_ENV,
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: ['./src/database/entity/*.ts'],
  synchronize: true,
});

dataSource.initialize().then(() => console.log('Data source initialized'));
