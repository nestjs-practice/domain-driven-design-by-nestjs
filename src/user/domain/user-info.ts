import { BaseObject } from '@/common/model/base-object';
import { CreateUserDto } from '@/user/applications/commands/create-user/create-user.dto';
import { Nullable } from '@/common/type/data-type';

type Props = {
  userId: number;
  name: string;
  birth?: Nullable<Date>;
  phone: string;
};

export class UserInfo extends BaseObject<Props> {
  static create(userId: number, dto: CreateUserDto) {
    return new UserInfo({
      userId,
      name: dto.name,
      birth: dto.birth || null,
      phone: dto.phone,
    });
  }

  getUserId() {
    return this.props.userId;
  }

  getName() {
    return this.props.name;
  }

  getBirth() {
    return this.props.birth;
  }

  getPhone() {
    return this.props.phone;
  }
}
