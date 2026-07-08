import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(['professor', 'student', 'admin'])
  role: 'professor' | 'student' | 'admin';
}
