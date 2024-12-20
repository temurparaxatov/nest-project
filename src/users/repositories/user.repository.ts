import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}
  async create(data: CreateUserDto): Promise<User> {
    const newUser = await this.usersModel.create(data);
    await newUser.save();
    return newUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersModel.find();
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersModel.findById(id);
    return user;
  }

  async findbyEmail(email: string): Promise<User> {
    try {
      const userbyEmail = await this.usersModel.findOne({ email });
      return userbyEmail;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const updatedUser = await this.usersModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedUser;
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await this.usersModel.findByIdAndDelete(id);
    return deletedUser;
  }
}
