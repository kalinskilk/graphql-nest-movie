import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  FieldsAndRelations,
  FieldsAndRelationsGql,
} from 'src/decorators/fields-gql';
import { ActorsService } from './actors.service';
import { ActorsDto } from './dto/actors.dto';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Resolver()
export class ActorsResolver {
  constructor(private readonly actorsService: ActorsService) {}

  @Mutation(() => ActorsDto)
  createActor(
    @Args('createActorDto', { type: () => CreateActorDto })
    createActorDto: CreateActorDto,
  ) {
    return this.actorsService.create(createActorDto);
  }

  @Query(() => [ActorsDto], { nullable: 'items' })
  findAllActors(
    @Args('page') page: number,
    @Args('offset') offset: number,
    @FieldsAndRelationsGql()
    fieldsAndRelations: FieldsAndRelations<ActorsDto>,
  ) {
    return this.actorsService.findAll(page, offset, fieldsAndRelations);
  }

  @Query(() => ActorsDto, { nullable: true })
  findOneActor(
    @Args('idActors') idActors: number,
    @FieldsAndRelationsGql()
    fieldsAndRelations: FieldsAndRelations<ActorsDto>,
  ) {
    return this.actorsService.findOne({
      where: { idActors },
      select: fieldsAndRelations.fields,
    });
  }

  @Query(() => [ActorsDto])
  findActorsByMovie(
    @Args('idMovies') idMovies: number,
    @Args('page') page: number,
    @Args('offset') offset: number,
    @FieldsAndRelationsGql()
    fieldsAndRelations: FieldsAndRelations<ActorsDto>,
  ) {
    return this.actorsService.findByMovie(
      idMovies,
      page,
      offset,
      fieldsAndRelations,
    );
  }

  @Mutation(() => Boolean)
  updateActor(
    @Args('idActors') idActors: number,
    @Args('updateActor', { type: () => UpdateActorDto })
    updateActorDto: UpdateActorDto,
  ) {
    return this.actorsService.update(idActors, updateActorDto);
  }

  @Mutation(() => Boolean)
  removeActor(@Args('idActors') idActors: number) {
    return this.actorsService.remove(idActors);
  }
}
