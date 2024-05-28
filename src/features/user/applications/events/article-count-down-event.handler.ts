import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BoardArticleEvent } from '@/features/board/applications/board-article/commands/create-board-article/events/create-board-article.event';
import { Inject, Logger, NotFoundException } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryToken,
} from '@/features/user/infrastructure/repository/user/i.user.repository';

@EventsHandler(BoardArticleEvent.Deleted)
export class ArticleCountDownEventHandler implements IEventHandler<BoardArticleEvent.Deleted> {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async handle(event: BoardArticleEvent.Deleted) {
    Logger.debug('[EVENT] - User Analytics Article Count Down Event Handler');
    const { userId } = event;
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException();
    }
    // * analytics count 업데이트
    user.getAnalytics().setArticleCountDown();
    await this.userRepository.upsert(user);
  }
}
