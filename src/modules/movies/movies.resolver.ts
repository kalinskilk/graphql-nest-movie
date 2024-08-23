import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  FieldsAndRelations,
  FieldsAndRelationsGql,
} from 'src/decorators/fields-gql';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieDto } from './dto/movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';

@Resolver()
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Mutation(() => MovieDto)
  createMovie(
    @Args('createMovieDto', { type: () => CreateMovieDto })
    createMovieDto: CreateMovieDto,
  ): Promise<MovieDto> {
    return this.moviesService.create(createMovieDto);
  }

  @Query(() => [MovieDto])
  findAllMovies(
    @Args('page', { type: () => Number }) page: number,
    @Args('offset', { type: () => Number }) offset: number,
    @FieldsAndRelationsGql('movies')
    fieldsAndRelations: FieldsAndRelations<MovieDto>,
  ) {
    return this.moviesService.findAll(page, offset, fieldsAndRelations);
  }

  @Query(() => MovieDto, { nullable: true })
  findOneMovies(
    @Args('idMovies') idMovies: number,
    @FieldsAndRelationsGql('movies')
    fieldsAndRelations: FieldsAndRelations<MovieDto>,
  ) {
    return this.moviesService.findOne(
      { where: { idMovies } },
      fieldsAndRelations,
    );
  }

  @Mutation(() => Boolean)
  updateMovies(
    @Args('idMovies') idMovies: number,
    @Args('updateMovieDto', { type: () => UpdateMovieDto })
    updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(idMovies, updateMovieDto);
  }

  @Mutation(() => Boolean)
  removeMovies(@Args('idMovies') idMovies: number) {
    return this.moviesService.remove(idMovies);
  }
}
