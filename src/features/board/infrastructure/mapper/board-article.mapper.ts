import { BoardArticle } from '@/features/board/domain/board-article';
import { BoardArticleEntity } from '@/features/board/infrastructure/entity/board-article.entity';

export class BoardArticleMapper {
  static toEntity(model: BoardArticle) {
    return new BoardArticleEntity({
      userId: model.getUserId(),
      boardId: model.getBoardId(),
      title: model.getTitle(),
      content: model.getContent(),
    });
  }

  static toModel(entity: BoardArticleEntity) {
    return new BoardArticle({
      id: entity.id,
      userId: entity.userId,
      boardId: entity.boardId,
      title: entity.title,
      content: entity.content,
      createdDate: entity.createdDate,
      updatedDate: entity.updatedDate,
    });
  }
}
