import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ExamGenerationService {
  /**
   * Stub: generates mock questions for a given study material.
   * TODO
   */
  async generateExam(_materialId: string): Promise<any[]> {
    throw new HttpException(
      'AI exam generation — not yet implemented',
      HttpStatus.NOT_IMPLEMENTED,
    );
  }
}
