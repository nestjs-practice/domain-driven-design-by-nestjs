import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateUserHandler } from '@/user/applications/commands/create-user/create-user.handler';
import { FindUserByIdHandler } from '@/user/applications/queries/find-user-by-id/find-user-by-id.handler';
import { CreateUserDto } from '@/user/applications/commands/create-user/create-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserHandler: CreateUserHandler,
    private readonly findUserByIdHandler: FindUserByIdHandler,
  ) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return await this.createUserHandler.execute(dto);
  }

  @Get(':userId')
  async findUserById(@Param('userId', ParseIntPipe) userId: number) {
    return await this.findUserByIdHandler.execute(userId);
  }
}
