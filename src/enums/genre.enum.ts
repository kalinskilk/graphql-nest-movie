import { registerEnumType } from '@nestjs/graphql';

export enum GenreMoviesEnum {
  action = 0,
  romance = 1,
  comedy = 2,
  drama = 3,
  horror = 4,
  scienceFiction = 5,
  fantasy = 6,
  animated = 7,
}

registerEnumType(GenreMoviesEnum, {
  name: 'GenreMoviesEnum',
});
