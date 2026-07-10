import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({
    summary: 'Get my profile',
    description: 'Returns the currently authenticated user.',
  })
  async getMe(@CurrentUser() user: { id: string }) {
    const found = await this.usersService.findById(user.id);
    if (!found) throw new NotFoundException('User not found');
    return found;
  }

  @Patch('me')
  @ApiOperation({
    summary: 'Update my profile',
    description:
      'Allows the authenticated user to update their own profile fields.',
  })
  async updateMe(
    @CurrentUser() user: { id: string },
    @Body() dto: UpdateUserDto,
  ) {
    const updated = await this.usersService.update(user.id, dto);
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Returns any user by their MongoDB ID.',
  })
  async findOne(@Param('id') id: string) {
    const found = await this.usersService.findById(id);
    if (!found) throw new NotFoundException('User not found');
    return found;
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({
    summary: 'Update user (admin)',
    description: 'Admin-only. Updates any user by ID.',
  })
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const updated = await this.usersService.update(id, dto);
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }
}
