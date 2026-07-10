import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserDocument> {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const createdUser = new this.userModel({
      name: dto.name,
      email: dto.email,
      passwordHash,
      role: dto.role,
    });
    return createdUser.save();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).select('-passwordHash').exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    // passwordHash IS selected here — needed for bcrypt comparison in AuthService
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserDocument | null> {
    const updateData: any = { ...dto };
    if (dto.password) {
      updateData.passwordHash = await bcrypt.hash(dto.password, 10);
      delete updateData.password;
    }
    return this.userModel
      .findByIdAndUpdate(id, updateData, { returnDocument: 'after' })
      .select('-passwordHash')
      .exec();
  }
}
