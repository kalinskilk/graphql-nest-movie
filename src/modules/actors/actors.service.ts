import { Inject, Injectable } from '@nestjs/common';
import {
  fieldMustBeSupply,
  maximumAllowedLength,
  notFound,
} from 'src/const/custom-error';
import { repoConsts } from 'src/const/repositorys';
import { FieldsAndRelations } from 'src/decorators/fields-gql';
import { BaseCrud } from 'src/interfaces/base-crud';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { MoviesEntity } from '../movies/entities/movie.entity';
import { ActorsDto } from './dto/actors.dto';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { ActorsEntity } from './entities/actor.entity';

@Injectable()
export class ActorsService implements BaseCrud<ActorsDto> {
  constructor(
    @Inject(repoConsts.tblActors)
    private repository: Repository<ActorsEntity>,
  ) {}

  async create(createActorDto: CreateActorDto): Promise<ActorsDto> {
    await this.createValidate(createActorDto);
    if (!createActorDto.idActors) {
      delete createActorDto.idActors;
    }
    return this.repository.save(createActorDto);
  }

  async createValidate(
    createActorDto: CreateActorDto,
    isBeforeCreateMovie = false,
  ) {
    if (!createActorDto.idMovies && !isBeforeCreateMovie) {
      throw new Error(fieldMustBeSupply('idMovies'));
    }
    if (!createActorDto.name) {
      throw new Error(fieldMustBeSupply('name'));
    }
    this.validateMaxLengthsFields({ name: createActorDto.name });

    if (!isBeforeCreateMovie) {
      const hasMovie = await this.repository.manager
        .getRepository(MoviesEntity)
        .count({ where: { idMovies: createActorDto.idMovies } });
      if (!hasMovie) {
        throw new Error(notFound('Movie'));
      }
    }
  }

  validateMaxLengthsFields(input: { name: string }) {
    if (input.name?.length > 255) {
      throw new Error(maximumAllowedLength('name', 255));
    }
  }

  async findAll(
    page: number,
    offset: number,
    fieldsAndRelations: FieldsAndRelations<ActorsDto>,
  ) {
    if (Number.isNaN(page)) {
      throw new Error(fieldMustBeSupply('page'));
    }
    if (Number.isNaN(offset)) {
      throw new Error(fieldMustBeSupply('offset'));
    }
    return this.repository.find({
      skip: (page - 1) * offset,
      take: offset,
      select: fieldsAndRelations.fields,
    });
  }

  async findByMovie(
    idMovies: number,
    page: number,
    offset: number,
    fieldsAndRelations: FieldsAndRelations<ActorsDto>,
  ) {
    if (Number.isNaN(page)) {
      throw new Error(fieldMustBeSupply('page'));
    }
    if (Number.isNaN(offset)) {
      throw new Error(fieldMustBeSupply('offset'));
    }
    const data = await this.repository.find({
      skip: (page - 1) * offset,
      take: offset,
      where: { idMovies },
      select: fieldsAndRelations.fields,
    });
    return data;
  }

  async findOne(options: FindOneOptions<ActorsEntity>) {
    const data = await this.repository.findOne(options);
    if (!data) {
      throw new Error(notFound('Actor'));
    }
    return data;
  }

  async count(options: FindOneOptions<ActorsEntity>): Promise<number> {
    return this.repository.count(options);
  }

  async update(
    idActors: number,
    updateMovieDto: UpdateActorDto,
  ): Promise<boolean> {
    await this.updateValidate(idActors, updateMovieDto);
    const data = await this.repository.update({ idActors }, updateMovieDto);
    return data?.affected > 0;
  }

  async updateValidate(idActors: number, updateActorDto: UpdateActorDto) {
    if (Number.isNaN(idActors)) {
      throw new Error(fieldMustBeSupply('idActors'));
    }
    this.validateMaxLengthsFields({
      name: updateActorDto.name,
    });
  }

  async remove(idActors: number) {
    if (Number.isNaN(idActors)) {
      throw new Error(fieldMustBeSupply('idActors'));
    }
    const data = await this.repository.delete({ idActors });
    return data.affected > 0;
  }

  async removeByConditions(options: FindOptionsWhere<ActorsEntity>) {
    const data = await this.repository.delete(options);
    return data.affected > 0;
  }
}
