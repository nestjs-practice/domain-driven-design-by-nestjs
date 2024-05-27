import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import mysqlConfig from '@/config/mysql.config';
import { ormConfig } from '@/config/ormConfig';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [mysqlConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(ormConfig),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
