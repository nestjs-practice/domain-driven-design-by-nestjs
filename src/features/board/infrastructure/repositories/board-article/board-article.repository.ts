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

  async create(model: BoardArticle) {
    const entity = BoardArticleMapper.toEntity(model);
    await this.repository.save(entity);
  }
}
