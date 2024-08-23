import { Module } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { actorsProviders } from './actors.provider';
import { ActorsResolver } from './actors.resolver';
import { ActorsService } from './actors.service';

@Module({
  providers: [ActorsService, ActorsResolver, ...actorsProviders, EntityManager],
  exports: [ActorsService],
})
export class ActorsModule {}
