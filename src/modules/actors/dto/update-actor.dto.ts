import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateActorDto {
  @Field({
    description: 'Name of actor',
  })
  name: string;
}
