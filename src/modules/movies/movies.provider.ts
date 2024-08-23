import { DATA_SOURCE, repoConsts } from 'src/const/repositorys';
import { DataSource } from 'typeorm';

import { MoviesEntity } from './entities/movie.entity';

export const moviesProviders = [
  {
    provide: repoConsts.tblMovies,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MoviesEntity),
    inject: [DATA_SOURCE],
  },
];
