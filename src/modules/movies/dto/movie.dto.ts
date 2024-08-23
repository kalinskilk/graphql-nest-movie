import { Field, ObjectType } from '@nestjs/graphql';
import { GenreMoviesEnum } from 'src/enums/genre.enum';
import { CreateActorDto } from 'src/modules/actors/dto/create-actor.dto';
import { MoviesEntity } from '../entities/movie.entity';

@ObjectType()
export class MovieDto extends MoviesEntity {
  @Field({
    nullable: true,
    description: 'Unrequired for created, but required for update.',
  })
  idMovies?: number;

  @Field({
    description: 'Enter the title of movie. Example: Titanic',
  })
  title: string;

  @Field({
    description: 'Enter the genre of movie. example: 0',
  })
  genre: GenreMoviesEnum;

  @Field({
    description:
      'Enter the url of image preview. Example: https://your-image.com',
  })
  imagePreview: string;

  @Field({
    description: 'Describe the film. Titanic sank in 1912. etc...',
  })
  synopsis: string;

  @Field(() => [CreateActorDto], {
    description: 'List of actors.',
  })
  actors?: CreateActorDto[];
}
