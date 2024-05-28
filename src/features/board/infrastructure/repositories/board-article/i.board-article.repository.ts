import { BoardArticle } from '@/features/board/domain/board-article';
import { Nullable } from '@/common/type/data-type';

export const BoardArticleRepositoryToken = Symbol('BoardArticleRepository');

export interface IBoardArticleRepository {
  upsert(model: BoardArticle): Promise<void>;

  findOneById(id: number): Promise<Nullable<BoardArticle>>;
}
