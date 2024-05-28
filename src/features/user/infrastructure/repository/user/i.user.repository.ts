import { Nullable } from '@/common/type/data-type';
import { UserAccount } from '@/features/user/domain/user-account';
import { User } from '@/features/user/domain/user';

export const UserRepositoryToken = Symbol('UserRepository');

export interface IUserRepository {
  insertUserId(model: UserAccount): Promise<number>;

  upsert(model: User): Promise<void>;
  
  findUserById(userId: number): Promise<Nullable<User>>;
}
