import { Inject, Injectable } from '@nestjs/common';
import {
  BoardArticleRepositoryToken,
  IBoardArticleRepository,
} from '@/features/board/infrastructure/repositories/board-article/i.board-article.repository';
import { CreateBoardArticleDto } from '@/features/board/applications/board-article/commands/create-board-article/create-board-article.dto';
import { BoardArticle } from '@/features/board/domain/board-article';

@Injectable()
export class CreateBoardArticleHandler {
  constructor(
    @Inject(BoardArticleRepositoryToken)
    private readonly boardArticleRepository: IBoardArticleRepository,
  ) {}

  async execute(userId: number, boardId: number, dto: CreateBoardArticleDto) {
    // TODO : user, board에 대한 검증(존재하는지)
    const boardArticle = BoardArticle.create(userId, boardId, dto);
    await this.boardArticleRepository.create(boardArticle);
    // TODO : 게시글 생성에 대한 event 발행 -> user-analytics board_count 업데이트
  }
}
