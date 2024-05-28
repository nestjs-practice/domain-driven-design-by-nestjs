import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BoardArticleEvent } from '@/features/board/applications/board-article/commands/create-board-article/events/create-board-article.event';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryToken,
} from '@/features/user/infrastructure/repository/i.user.repository';

@EventsHandler(BoardArticleEvent.Created)
export class ModifyUserAnalyticsEventHandler implements IEventHandler<BoardArticleEvent.Created> {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async handle(event: BoardArticleEvent.Created) {
    const { userId } = event;
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException();
    }
    // * analytics count 업데이트
    user.getAnalytics().setArticleCountUp();
    await this.userRepository.upsert(user);
  }
}
