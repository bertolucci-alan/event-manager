import { DataSource } from 'typeorm';

export const dataSource: DataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'event_manager',
  entities: ['./src/database/entity/*.ts'],
  synchronize: true,
});

dataSource.initialize().then(() => console.log('Data source initialized'));
