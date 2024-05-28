import { Injectable } from '@nestjs/common';
import { IBoardArticleRepository } from '@/features/board/infrastructure/repositories/board-article/i.board-article.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardArticleEntity } from '@/features/board/infrastructure/entity/board-article.entity';
import { Repository } from 'typeorm';
import { BoardArticle } from '@/features/board/domain/board-article';
import { BoardArticleMapper } from '@/features/board/infrastructure/mapper/board-article.mapper';

@Injectable()
export class BoardArticleRepository implements IBoardArticleRepository {
  constructor(
    @InjectRepository(BoardArticleEntity)
    private readonly repository: Repository<BoardArticleEntity>,
  ) {}

  async upsert(model: BoardArticle) {
    const entity = BoardArticleMapper.toEntity(model);
    await this.repository.save(entity);
  }

  async findOneById(id: number) {
    const entity = await this.repository.findOneBy({ id });
    return entity ? BoardArticleMapper.toModel(entity) : null;
  }
}
