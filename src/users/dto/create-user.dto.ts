import { IsEmail, IsString, Min } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @Min(3)
  firstname: string;
  @IsString()
  @Min(3)
  lastname: string;
  @IsString()
  @IsEmail()
  email: string;
}
