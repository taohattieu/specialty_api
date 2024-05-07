import { FindManyOptions, Repository } from 'typeorm';

export class BaseRepository<TEntity> extends Repository<TEntity> {
  async findAndCount(options?: FindManyOptions<TEntity>): Promise<[TEntity[], number]> {
    return super.findAndCount(options);
  }
}
