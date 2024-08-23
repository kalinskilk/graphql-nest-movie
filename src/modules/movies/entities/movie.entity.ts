import { GenreMoviesEnum } from 'src/enums/genre.enum';
import { ActorsEntity } from 'src/modules/actors/entities/actor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('MOVIES')
export class MoviesEntity {
  @PrimaryGeneratedColumn({ name: 'ID_MOVIES' })
  idMovies?: number;

  @Column('varchar', { name: 'TITLE', length: 255, nullable: false })
  title: string;

  @Column({ name: 'GENRE', type: 'int' })
  genre: GenreMoviesEnum;

  @Column({ name: 'IMAGE_PREVIEW', type: 'varchar', length: 500 })
  imagePreview: string;

  @Column({ name: 'SYNOPSIS', type: 'varchar', length: 2000 })
  synopsis: string;

  @OneToMany(() => ActorsEntity, (actors) => actors.movies, {
    nullable: true,
  })
  @JoinColumn({
    name: 'ID_MOVIES',
    referencedColumnName: 'idMovies',
    foreignKeyConstraintName: 'MOVIES_ACTORS',
  })
  actors?: ActorsEntity[];
}
