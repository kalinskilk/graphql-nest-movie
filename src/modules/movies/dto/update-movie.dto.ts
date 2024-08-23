import { Field, InputType } from '@nestjs/graphql';
import { GenreMoviesEnum } from 'src/enums/genre.enum';

@InputType()
export class UpdateMovieDto {
  @Field({
    description: 'Enter the genre of movie. Example: 0',
    nullable: true,
  })
  genre: GenreMoviesEnum;

  @Field({
    description:
      'Enter the url of image preview.  Example: https://site.com/image',
    nullable: true,
  })
  imagePreview: string;

  @Field({
    description: 'Enter the title of movie. Example:Titanic',
    nullable: true,
  })
  title: string;

  @Field({
    description: 'Describe the film. Example: Titanic sank in 1912. etc...',
    nullable: true,
  })
  synopsis: string;
}
