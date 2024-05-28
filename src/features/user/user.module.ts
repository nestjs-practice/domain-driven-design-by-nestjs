import { Module, Provider, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindUserByIdHandler } from '@/features/user/applications/queries/find-user-by-id/find-user-by-id.handler';
import { UserRepositoryToken } from '@/features/user/infrastructure/repository/i.user.repository';
import { UserRepository } from '@/features/user/infrastructure/repository/user.repository';
import { CreateUserHandler } from '@/features/user/applications/commands/create-user/create-user.handler';
import { UserAccountEntity } from '@/features/user/infrastructure/entity/user-account.entity';
import { UserInfoEntity } from '@/features/user/infrastructure/entity/user-info.entity';
import { UserSettingEntity } from '@/features/user/infrastructure/entity/user-setting.entity';
import { ArticleCountUpEventHandler } from '@/features/user/applications/events/article-count-up-event.handler';
import { UserExternalService } from '@/features/user/interfaces/external/user.external.service';
import { UserAnalyticsEntity } from '@/features/user/infrastructure/entity/user-analytics.entity';

const controllers: Type[] = [];

const applications: Provider[] = [
  /** Command **/
  CreateUserHandler,

  /** Query **/
  FindUserByIdHandler,
];

const interfaces: Provider[] = [UserExternalService];

const repositories: Provider[] = [
  {
    provide: UserRepositoryToken,
    useClass: UserRepository,
  },
];

const events: Provider[] = [ArticleCountUpEventHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserAccountEntity,
      UserInfoEntity,
      UserSettingEntity,
      UserAnalyticsEntity,
    ]),
  ],
  providers: [...applications, ...repositories, ...events, ...interfaces],
  controllers: [...controllers],
  exports: [...interfaces],
})
export class UserModule {}
