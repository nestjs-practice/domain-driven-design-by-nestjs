import { Module, Provider, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccountEntity } from '@/user/infrastructure/entity/user-account.entity';
import { UserInfoEntity } from '@/user/infrastructure/entity/user-info.entity';
import { UserSettingEntity } from '@/user/infrastructure/entity/user-setting.entity';
import { UserRepositoryToken } from '@/user/infrastructure/repository/i.user.repository';
import { UserRepository } from '@/user/infrastructure/repository/user.repository';
import { CreateUserHandler } from '@/user/applications/commands/create-user/create-user.handler';
import { FindUserByIdHandler } from '@/user/applications/queries/find-user-by-id/find-user-by-id.handler';

const controllers: Type[] = [];

const applications: Provider[] = [
  /** Command **/
  CreateUserHandler,

  /** Query **/
  FindUserByIdHandler,
];

const interfaces: Provider[] = [];

const repositories: Provider[] = [
  {
    provide: UserRepositoryToken,
    useClass: UserRepository,
  },
];

const events: Provider[] = [];

@Module({
  imports: [TypeOrmModule.forFeature([UserAccountEntity, UserInfoEntity, UserSettingEntity])],
  providers: [...applications, ...repositories, ...events],
  controllers: [...controllers],
  exports: [...interfaces],
})
export class UserModule {}
