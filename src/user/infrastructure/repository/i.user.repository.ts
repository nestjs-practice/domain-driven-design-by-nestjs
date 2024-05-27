import { UserAccount } from '@/user/domain/user-account';
import { User } from '@/user/domain/user';
import { Nullable } from '@/common/type/data-type';

export const UserRepositoryToken = Symbol('UserRepository');

export interface IUserRepository {
  insertUserId(model: UserAccount): Promise<number>;

  create(model: User): Promise<void>;

  findUserById(userId: number): Promise<Nullable<User>>;
}
