import { BaseObject } from '@/common/model/base-object';
import { UserAccount } from '@/features/user/domain/user-account';
import { UserInfo } from '@/features/user/domain/user-info';
import { UserSetting } from '@/features/user/domain/user-setting';
import { UserAnalytics } from '@/features/user/domain/user-analytics';
import { CreateUserDto } from '@/features/user/applications/commands/create-user/create-user.dto';

type Props = {
  account: UserAccount;
  info: UserInfo;
  setting: UserSetting;
  analytics: UserAnalytics;
};

// * user aggregation
export class User extends BaseObject<Props> {
  static create(userId: number, dto: CreateUserDto) {
    return new User({
      account: UserAccount.create(userId, dto),
      info: UserInfo.create(userId, dto),
      setting: UserSetting.create(userId, dto),
      analytics: UserAnalytics.empty(userId),
    });
  }

  getAccount() {
    return this.props.account;
  }

  getInfo() {
    return this.props.info;
  }

  getSetting() {
    return this.props.setting;
  }

  getAnalytics() {
    return this.props.analytics;
  }
}
