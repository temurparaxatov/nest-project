import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userrepository: UsersRepository) {}
  create(data: CreateUserDto) {
    return this.userrepository.create(data);
  }

  findAll() {
    return this.userrepository.findAll();
  }

  findOne(id: string) {
    return this.userrepository.findOne(id);
  }

  findbyEmail(email: string) {
    return this.userrepository.findbyEmail(email);
  }

  update(id: string, data: UpdateUserDto) {
    return this.userrepository.update(id, data);
  }

  remove(id: string) {
    return this.userrepository.delete(id);
  }
}
