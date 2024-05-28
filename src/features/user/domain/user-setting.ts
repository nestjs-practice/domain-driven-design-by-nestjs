import { Nullable } from '@/common/type/data-type';
import { BaseObject } from '@/common/model/base-object';
import { CreateUserDto } from '@/user/applications/commands/create-user/create-user.dto';

type Props = {
  userId: number;
  agreeEmail: boolean;
  agreeEmailDate: Nullable<Date>;
  agreeSms: boolean;
  agreeSmsDate: Nullable<Date>;
};

export class UserSetting extends BaseObject<Props> {
  static create(userId: number, dto: CreateUserDto) {
    return new UserSetting({
      userId,
      agreeEmail: dto.agreeEmail,
      agreeEmailDate: dto.agreeEmail === true ? new Date() : null,
      agreeSms: dto.agreeSms,
      agreeSmsDate: dto.agreeSms === true ? new Date() : null,
    });
  }

  getUserId() {
    return this.props.userId;
  }

  getAgreeEmail() {
    return Boolean(this.props.agreeEmail);
  }

  getAgreeEmailDate() {
    return this.props.agreeEmailDate;
  }

  getAgreeSms() {
    return Boolean(this.props.agreeSms);
  }

  getAgreeSmsDate() {
    return this.props.agreeSmsDate;
  }
}
