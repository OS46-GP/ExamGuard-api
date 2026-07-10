import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (isMatch) {
        return { id: user._id.toString(), email: user.email, role: user.role };
      }
    }
    return null;
  }

  async login(user: any): Promise<any> {
    const payload = {
      sub: user.id || user._id?.toString(),
      email: user.email,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: RegisterDto): Promise<any> {
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }
    const createdUser = await this.usersService.create(dto);
    return this.login(createdUser);
  }
}
