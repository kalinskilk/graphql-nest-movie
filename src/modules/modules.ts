import { Module } from '@nestjs/common';
import { ActorsModule } from './actors/actors.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [MoviesModule, ActorsModule],
})
export class Modules {}
