import { Injectable } from '@nestjs/common';
import { Nullable } from '@/common/type/data-type';
import { IUserRepository } from '@/features/user/infrastructure/repository/user/i.user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAccountEntity } from '@/features/user/infrastructure/entity/user-account.entity';
import { Repository } from 'typeorm';
import { UserInfoEntity } from '@/features/user/infrastructure/entity/user-info.entity';
import { UserSettingEntity } from '@/features/user/infrastructure/entity/user-setting.entity';
import { UserAccount } from '@/features/user/domain/user-account';
import { UserAccountMapper } from '@/features/user/infrastructure/mapper/user-account.mapper';
import { User } from '@/features/user/domain/user';
import { UserInfoMapper } from '@/features/user/infrastructure/mapper/user-info.mapper';
import { UserSettingMapper } from '@/features/user/infrastructure/mapper/user-setting.mapper';
import { UserMapper } from '@/features/user/infrastructure/mapper/user.mapper';
import { UserAnalyticsEntity } from '@/features/user/infrastructure/entity/user-analytics.entity';
import { UserAnalyticsMapper } from '@/features/user/infrastructure/mapper/user-analytics.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserAccountEntity)
    private readonly userAccountRepository: Repository<UserAccountEntity>,
    @InjectRepository(UserInfoEntity)
    private readonly userInfoRepository: Repository<UserInfoEntity>,
    @InjectRepository(UserSettingEntity)
    private readonly userSettingRepository: Repository<UserSettingEntity>,
    @InjectRepository(UserAnalyticsEntity)
    private readonly userAnalyticsRepository: Repository<UserAnalyticsEntity>,
  ) {}

  async insertUserId(model: UserAccount): Promise<number> {
    const entity = UserAccountMapper.toEntity(model);
    const savedEntity = await this.userAccountRepository.save(entity);
    return savedEntity.id!;
  }

  async upsert(model: User): Promise<void> {
    const userAccountEntity = UserAccountMapper.toEntity(model.getAccount());
    const userInfoEntity = UserInfoMapper.toEntity(model.getInfo());
    const userSettingEntity = UserSettingMapper.toEntity(model.getSetting());
    const userAnalyticsEntity = UserAnalyticsMapper.toEntity(model.getAnalytics());
    await Promise.all([
      this.userAccountRepository.save(userAccountEntity),
      this.userInfoRepository.save(userInfoEntity),
      this.userSettingRepository.save(userSettingEntity),
      this.userAnalyticsRepository.save(userAnalyticsEntity),
    ]);
  }

  async findUserById(userId: number): Promise<Nullable<User>> {
    const [account, info, setting, analytics] = await Promise.all([
      this.userAccountRepository.findOneBy({ id: userId }),
      this.userInfoRepository.findOneBy({ userId }),
      this.userSettingRepository.findOneBy({ userId }),
      this.userAnalyticsRepository.findOneBy({ userId }),
    ]);
    if (!account || !info || !setting || !analytics) {
      return null;
    }
    return UserMapper.toModel(account, info, setting, analytics);
  }
}
