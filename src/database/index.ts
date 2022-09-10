import { DataSource } from 'typeorm';

export const dataSource: DataSource = new DataSource({
  name: 'test',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'event_manager_test',
  entities: ['./src/database/entity/*.ts'],
  synchronize: true,
  dropSchema: true,
});

(async () => {
  await dataSource.initialize();
})();
