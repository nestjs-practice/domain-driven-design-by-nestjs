import { UserAccount } from '@/user/domain/user-account';
import { UserInfo } from '@/user/domain/user-info';
import { UserSetting } from '@/user/domain/user-setting';
import { BaseObject } from '@/common/model/base-object';
import { CreateUserDto } from '@/user/applications/commands/create-user/create-user.dto';

type Props = {
  account: UserAccount;
  info: UserInfo;
  setting: UserSetting;
};

// * user aggregation
export class User extends BaseObject<Props> {
  static create(userId: number, dto: CreateUserDto) {
    return new User({
      account: UserAccount.create(userId, dto),
      info: UserInfo.create(userId, dto),
      setting: UserSetting.create(userId, dto),
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
}
