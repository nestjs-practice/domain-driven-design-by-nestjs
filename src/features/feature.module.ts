import { Module, Type } from '@nestjs/common';
import { UserModule } from '@/features/user/user.module';
import { BoardModule } from '@/features/board/board.module';

const modules: Type[] = [UserModule, BoardModule];

@Module({
  imports: [...modules],
  exports: [...modules],
})
export class FeatureModule {}
