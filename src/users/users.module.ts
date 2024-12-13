import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/user.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
})
export class UsersModule {}
