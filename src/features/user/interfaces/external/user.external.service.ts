import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryToken,
} from '@/features/user/infrastructure/repository/user/i.user.repository';

@Injectable()
export class UserExternalService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly repository: IUserRepository,
  ) {}

  async findOne(userId: number) {
    const user = await this.repository.findUserById(userId);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
