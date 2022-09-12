import { DataSource } from 'typeorm';

export const dataSource: DataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
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
