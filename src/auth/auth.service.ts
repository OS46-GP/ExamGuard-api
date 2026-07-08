import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  // TODO
  async validateUser(email: string, _password: string): Promise<any> {
    return { id: 'mock-id', email, role: 'student' };
  }

  // TODO
  async login(_user: any): Promise<any> {
    return { access_token: 'mock-jwt-token' };
  }

  // TODO
  async register(_dto: RegisterDto): Promise<any> {
    return { access_token: 'mock-jwt-token' };
  }
}
