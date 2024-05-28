import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryToken,
} from '@/features/user/infrastructure/repository/user/i.user.repository';
import { FindUserByIdRo } from '@/features/user/applications/queries/find-user-by-id/find-user-by-id.ro';

@Injectable()
export class FindUserByIdHandler {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: number) {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException();
    }
    return FindUserByIdRo.from(user);
  }
}
