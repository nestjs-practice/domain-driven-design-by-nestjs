import { Injectable } from '@nestjs/common';
import { IBoardRepository } from '@/features/board/infrastructure/repositories/board/i.board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from '@/features/board/infrastructure/entity/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardRepository implements IBoardRepository {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly repository: Repository<BoardEntity>,
  ) {}
}
