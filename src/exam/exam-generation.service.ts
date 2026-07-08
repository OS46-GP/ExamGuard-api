import { Injectable } from '@nestjs/common';

@Injectable()
export class ExamGenerationService {
  /**
   * Stub: generates mock questions for a given study material.
   * TODO
   */
  async generateExam(materialId: string): Promise<any[]> {
    // TODO
    return [
      {
        stem: `Sample question for material ${materialId}`,
        options: ['A', 'B', 'C', 'D'],
        correctAnswerIndex: 0,
        cognitiveLevel: 'remember',
      },
    ];
  }
}
