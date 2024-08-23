import { Module } from '@nestjs/common';
import { ActorsModule } from '../actors/actors.module';
import { moviesProviders } from './movies.provider';
import { MoviesResolver } from './movies.resolver';
import { MoviesService } from './movies.service';

@Module({
  imports: [ActorsModule],
  providers: [MoviesService, ...moviesProviders, MoviesResolver],
  exports: [MoviesService],
})
export class MoviesModule {}
