import { Board } from '@/features/board/domain/board';
import { BoardEntity } from '@/features/board/infrastructure/entity/board.entity';

export class BoardMapper {
  static toEntity(model: Board) {
    return new BoardEntity({
      name: model.getName(),
      isHidden: model.getIsHidden(),
    });
  }

  static toModel(entity: BoardEntity) {
    return new Board({
      id: entity.id,
      name: entity.name,
      isHidden: entity.isHidden,
      createdDate: entity.createdDate,
      updatedDate: entity.updatedDate,
    });
  }
}
