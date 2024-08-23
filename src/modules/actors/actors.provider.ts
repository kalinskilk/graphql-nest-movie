import { DATA_SOURCE, repoConsts } from 'src/const/repositorys';
import { DataSource } from 'typeorm';

import { ActorsEntity } from './entities/actor.entity';

export const actorsProviders = [
  {
    provide: repoConsts.tblActors,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ActorsEntity),
    inject: [DATA_SOURCE],
  },
];
