import { MoviesEntity } from 'src/modules/movies/entities/movie.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ACTORS')
export class ActorsEntity {
  @PrimaryGeneratedColumn({ name: 'ID_ACTORS' })
  idActors: number;

  @Column({ name: 'ID_MOVIES' })
  idMovies: number;

  @Column({ name: 'NAME', type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => MoviesEntity, (movie) => movie.actors, { nullable: true })
  @JoinColumn({
    name: 'ID_MOVIES',
    referencedColumnName: 'idMovies',
    foreignKeyConstraintName: 'MOVIES_ACTORS',
  })
  movies?: MoviesEntity;
}
