import { BaseObject } from '@/common/model/base-object';
import { Nullable } from '@/common/type/data-type';
import { CreateUserDto } from '@/features/user/applications/commands/create-user/create-user.dto';

type Props = {
  userId: number;
  name: string;
  birth?: Nullable<Date>;
  phone: string;
  updatedDate?: Date;
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

  getUpdatedDate() {
    return this.props.updatedDate;
  }
}
