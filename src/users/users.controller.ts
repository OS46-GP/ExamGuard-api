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
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /**
   * GET /api/users/me
   * Returns the currently authenticated user's profile.
   * Available to all authenticated users (professor, student, admin).
   */
  @Get('me')
  async getMe(@CurrentUser() user: { id: string }) {
    const found = await this.usersService.findById(user.id);
    if (!found) throw new NotFoundException('User not found');
    return found;
  }

  /**
   * PATCH /api/users/me
   * Allows any authenticated user to update their own profile.
   */
  @Patch('me')
  async updateMe(
    @CurrentUser() user: { id: string },
    @Body() dto: UpdateUserDto,
  ) {
    const updated = await this.usersService.update(user.id, dto);
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  /**
   * GET /api/users/:id
   * Returns any user by ID. Requires authentication.
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const found = await this.usersService.findById(id);
    if (!found) throw new NotFoundException('User not found');
    return found;
  }

  /**
   * PATCH /api/users/:id
   * Updates any user by ID. Admin only.
   */
  @Patch(':id')
  @Roles('admin')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const updated = await this.usersService.update(id, dto);
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }
}

