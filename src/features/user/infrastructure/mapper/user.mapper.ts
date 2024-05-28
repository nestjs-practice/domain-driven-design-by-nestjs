import { UserAccountEntity } from '@/features/user/infrastructure/entity/user-account.entity';
import { UserInfoEntity } from '@/features/user/infrastructure/entity/user-info.entity';
import { UserSettingEntity } from '@/features/user/infrastructure/entity/user-setting.entity';
import { User } from '@/features/user/domain/user';
import { UserAccountMapper } from '@/features/user/infrastructure/mapper/user-account.mapper';
import { UserInfoMapper } from '@/features/user/infrastructure/mapper/user-info.mapper';
import { UserSettingMapper } from '@/features/user/infrastructure/mapper/user-setting.mapper';
import { UserAnalyticsMapper } from '@/features/user/infrastructure/mapper/user-analytics.mapper';
import { UserAnalyticsEntity } from '@/features/user/infrastructure/entity/user-analytics.entity';

export class UserMapper {
  static toModel(
    account: UserAccountEntity,
    info: UserInfoEntity,
    setting: UserSettingEntity,
    analytics: UserAnalyticsEntity,
  ) {
    return new User({
      account: UserAccountMapper.toModel(account),
      info: UserInfoMapper.toModel(info),
      setting: UserSettingMapper.toModel(setting),
      analytics: UserAnalyticsMapper.toModel(analytics),
    });
  }
}
