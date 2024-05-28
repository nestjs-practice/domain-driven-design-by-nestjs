import { BoardArticle } from '@/features/board/domain/board-article';

export const BoardArticleRepositoryToken = Symbol('BoardArticleRepository');

export interface IBoardArticleRepository {
  create(model: BoardArticle): Promise<void>;
}
