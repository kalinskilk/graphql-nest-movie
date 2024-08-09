import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: 'db/DB_MOVIES.db',
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
      });

      const db = await dataSource.initialize();
      return db;
    },
  },
];
