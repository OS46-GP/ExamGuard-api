import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({
    summary: 'Authenticate user',
    description: 'Logs in with email + password, returns a JWT access token.',
  })
  @ApiBody({ type: LoginDto })
  async login(@Req() req: any, @Body() _loginDto: LoginDto) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiOperation({
    summary: 'Create account',
    description: 'Registers a new user account and returns a JWT access token.',
  })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
