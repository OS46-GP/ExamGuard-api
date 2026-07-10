import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('materials')
@ApiBearerAuth()
@Controller('materials')
@UseGuards(AuthGuard('jwt'))
export class RagController {
  @Post('upload')
  @HttpCode(HttpStatus.NOT_IMPLEMENTED)
  @ApiOperation({
    summary: 'Upload material',
    description:
      'Uploads a document for AI-based exam generation. **Not yet implemented.**',
  })
  async upload(): Promise<any> {
    return {
      statusCode: HttpStatus.NOT_IMPLEMENTED,
      message: 'Upload endpoint — not yet implemented',
    };
  }
}
