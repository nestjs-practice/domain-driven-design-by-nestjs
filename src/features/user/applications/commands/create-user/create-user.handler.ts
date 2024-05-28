import { Inject, Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import {
  IUserRepository,
  UserRepositoryToken,
} from '@/features/user/infrastructure/repository/user/i.user.repository';
import { CreateUserDto } from '@/features/user/applications/commands/create-user/create-user.dto';
import { UserAccount } from '@/features/user/domain/user-account';
import { User } from '@/features/user/domain/user';

@Injectable()
export class CreateUserHandler {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  @Transactional()
  async execute(dto: CreateUserDto) {
    const userAccount = UserAccount.empty();
    const userId = await this.userRepository.insertUserId(userAccount);
    // * user 객체 생성
    const user = User.create(userId, dto);
    await this.userRepository.upsert(user);
  }
}
