import { Module, Provider, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from '@/features/board/infrastructure/entity/board.entity';
import { BoardArticleEntity } from '@/features/board/infrastructure/entity/board-article.entity';
import { BoardRepositoryToken } from '@/features/board/infrastructure/repositories/board/i.board.repository';
import { BoardRepository } from '@/features/board/infrastructure/repositories/board/board.repository';
import { BoardArticleRepositoryToken } from '@/features/board/infrastructure/repositories/board-article/i.board-article.repository';
import { BoardArticleRepository } from '@/features/board/infrastructure/repositories/board-article/board-article.repository';
import { UserModule } from '@/features/user/user.module';

const controllers: Type[] = [];

const applications: Provider[] = [];

const interfaces: Provider[] = [];

const repositories: Provider[] = [
  {
    provide: BoardRepositoryToken,
    useClass: BoardRepository,
  },
  {
    provide: BoardArticleRepositoryToken,
    useClass: BoardArticleRepository,
  },
];

const events: Provider[] = [];

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity, BoardArticleEntity]), UserModule],
  controllers: [...controllers],
  providers: [...applications, ...interfaces, ...repositories, ...events],
  exports: [...interfaces],
})
export class BoardModule {}
