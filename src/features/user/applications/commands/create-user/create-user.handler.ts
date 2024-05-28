import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryToken,
} from '@/user/infrastructure/repository/i.user.repository';
import { CreateUserDto } from '@/user/applications/commands/create-user/create-user.dto';
import { UserAccount } from '@/user/domain/user-account';
import { User } from '@/user/domain/user';
import { Transactional } from 'typeorm-transactional';

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
    await this.userRepository.create(user);
    // ! user 도메인외에 다른 업데이트 사항이 있는 테이블은 eventBus를 통한 업데이트
  }
}
