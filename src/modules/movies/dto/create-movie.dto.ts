import { Field, InputType } from '@nestjs/graphql';
import { GenreMoviesEnum } from 'src/enums/genre.enum';
import { CreateActorDto } from 'src/modules/actors/dto/create-actor.dto';
import { MovieDto } from './movie.dto';

@InputType()
export class CreateMovieDto extends MovieDto {
  @Field({ nullable: true })
  idMovies?: number;
  @Field()
  title: string;
  @Field()
  genre: GenreMoviesEnum;
  @Field()
  synopsis: string;
  @Field()
  imagePreview: string;
  @Field(() => [CreateActorDto])
  actors: CreateActorDto[];
}
