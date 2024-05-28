import { Nullable } from '@/common/type/data-type';
import { UserAccount } from '@/features/user/domain/user-account';

export const UserAccountRepositoryToken = Symbol('UserAccountRepository');

export interface IUserAccountRepository {
  findOneByEmail(email: string): Promise<Nullable<UserAccount>>;
}
