import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@/user/infrastructure/repository/i.user.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfoEntity } from '@/user/infrastructure/entity/user-info.entity';
import { UserAccountEntity } from '@/user/infrastructure/entity/user-account.entity';
import { UserSettingEntity } from '@/user/infrastructure/entity/user-setting.entity';
import { User } from '@/user/domain/user';
import { UserAccountMapper } from '@/user/infrastructure/mapper/user-account.mapper';
import { UserInfoMapper } from '@/user/infrastructure/mapper/user-info.mapper';
import { UserSettingMapper } from '@/user/infrastructure/mapper/user-setting.mapper';
import { UserAccount } from '@/user/domain/user-account';
import { UserMapper } from '@/user/infrastructure/mapper/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserAccountEntity)
    private readonly userAccountRepository: Repository<UserAccountEntity>,
    @InjectRepository(UserInfoEntity)
    private readonly userInfoRepository: Repository<UserInfoEntity>,
    @InjectRepository(UserSettingEntity)
    private readonly userSettingRepository: Repository<UserSettingEntity>,
  ) {}

  async insertUserId(model: UserAccount) {
    const entity = UserAccountMapper.toEntity(model);
    const savedEntity = await this.userAccountRepository.save(entity);
    return savedEntity.id!;
  }

  async create(model: User) {
    const userAccountEntity = UserAccountMapper.toEntity(model.getAccount());
    const userInfoEntity = UserInfoMapper.toEntity(model.getInfo());
    const userSettingEntity = UserSettingMapper.toEntity(model.getSetting());
    await Promise.all([
      this.userAccountRepository.save(userAccountEntity),
      this.userInfoRepository.save(userInfoEntity),
      this.userSettingRepository.save(userSettingEntity),
    ]);
  }

  async findUserById(userId: number) {
    const [account, info, setting] = await Promise.all([
      this.userAccountRepository.findOneBy({ id: userId }),
      this.userInfoRepository.findOneBy({ userId }),
      this.userSettingRepository.findOneBy({ userId }),
    ]);
    if (!account || !info || !setting) {
      return null;
    }
    return UserMapper.toModel(account, info, setting);
  }
}
