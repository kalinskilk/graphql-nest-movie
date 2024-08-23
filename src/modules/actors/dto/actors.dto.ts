import { Field, ObjectType } from '@nestjs/graphql';
import { ActorsEntity } from '../entities/actor.entity';

@ObjectType()
export class ActorsDto implements ActorsEntity {
  @Field({
    description: 'Unrequired for created, but required for update.',
    nullable: true,
  })
  idActors: number;

  @Field({ description: 'Unrequired for created, but required for update.' })
  idMovies: number;

  @Field({
    description: 'Name of actor',
  })
  name: string;
}
