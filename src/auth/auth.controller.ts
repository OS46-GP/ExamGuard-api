import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO
  @Post('login')
  async login(@Body() _loginDto: LoginDto) {
    return this.authService.login({ id: 'mock', email: _loginDto.email, role: 'student' });
  }

  // TODO
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
