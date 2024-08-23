import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ActorsDto } from './actors.dto';

@InputType('CreateActorInput')
@ObjectType()
export class CreateActorDto extends ActorsDto {
  @Field({ description: 'Unrequired for created, set 0' })
  idActors: number;

  @Field({ description: 'Unrequired for created, set 0' })
  idMovies: number;

  @Field({
    description: 'Name of actor',
  })
  name: string;
}
