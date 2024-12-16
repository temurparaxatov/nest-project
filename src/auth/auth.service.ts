import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { UsersRepository } from 'src/users/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  async signup(createUserDto: CreateUserDto) {
    const user = await this.userService.findbyEmail(createUserDto.email);
    if (user) {
      return new BadRequestException('user already existed');
    }
    const hashPassword = await bcrypt.hash(createUserDto.password);
    const newUser = this.userService.create({
      ...createUserDto,
      password: hashPassword,
    });
    return { newUser, success: 'User succesfuly registered' };
  }
  async signin(loginUserDto: LoginUserDto) {
    const user = await this.userService.findbyEmail(loginUserDto.email);
    if (!user) {
      return new UnauthorizedException('Login or password wrong!');
    }
    const compared = await bcrypt.compare(loginUserDto.password, user.password);
    if (!compared) {
      return new UnauthorizedException('Login or password wrong');
    }
    const token = await this.createToken(user);
    return {
      login: 'succes',
      token,
    };
  }

  async createToken(data) {
    const payload = {
      sub: data.id,
      email: data.email,
    };
    const token = await this.jwtService.signAsync(payload);
    console.log(token);

    return token;
  }
}
