import { UserAccount } from '@/features/user/domain/user-account';
import { UserAccountEntity } from '@/features/user/infrastructure/entity/user-account.entity';

export class UserAccountMapper {
  static toEntity(model: UserAccount) {
    return new UserAccountEntity({
      id: model.getId(),
      email: model.getEmail(),
      password: model.getPassword(),
    });
  }

  static toModel(entity: UserAccountEntity) {
    return new UserAccount({
      id: entity.id,
      email: entity.email,
      password: entity.password,
      createdDate: entity.createdDate,
      updatedDate: entity.updatedDate,
    });
  }
}
