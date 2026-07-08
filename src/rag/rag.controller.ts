import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('materials')
@UseGuards(AuthGuard('jwt'))
export class RagController {
  // TODO

  @Post('upload')
  async upload(): Promise<any> {
    // TODO
    return { message: 'Upload endpoint — not implemented yet' };
  }
}
