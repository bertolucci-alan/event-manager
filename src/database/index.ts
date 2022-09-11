import { DataSource } from 'typeorm';

export const dataSource: DataSource = new DataSource({
  name: 'default',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'event_manager',
  entities: ['./src/database/entity/*.ts'],
  synchronize: true,
});

(async () => {
  await dataSource
    .initialize()
    .then(() => console.log('Data source initialized'))
    .catch((err) => console.log(err));
})();
