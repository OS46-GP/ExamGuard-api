import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  // TODO
  async create(_dto: CreateUserDto): Promise<any> {
    return { _id: 'mock-id', ..._dto };
  }

  // TODO
  async findById(_id: string): Promise<any> {
    return null;
  }

  // TODO
  async findByEmail(_email: string): Promise<any> {
    return null;
  }

  // TODO
  async update(_id: string, _dto: UpdateUserDto): Promise<any> {
    return null;
  }
}
