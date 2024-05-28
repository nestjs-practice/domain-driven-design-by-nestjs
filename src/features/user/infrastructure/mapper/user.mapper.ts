import { UserAccountEntity } from '@/user/infrastructure/entity/user-account.entity';
import { UserInfoEntity } from '@/user/infrastructure/entity/user-info.entity';
import { UserSettingEntity } from '@/user/infrastructure/entity/user-setting.entity';
import { User } from '@/user/domain/user';
import { UserAccountMapper } from '@/user/infrastructure/mapper/user-account.mapper';
import { UserInfoMapper } from '@/user/infrastructure/mapper/user-info.mapper';
import { UserSettingMapper } from '@/user/infrastructure/mapper/user-setting.mapper';

export class UserMapper {
  static toModel(account: UserAccountEntity, info: UserInfoEntity, setting: UserSettingEntity) {
    return new User({
      account: UserAccountMapper.toModel(account),
      info: UserInfoMapper.toModel(info),
      setting: UserSettingMapper.toModel(setting),
    });
  }
}
