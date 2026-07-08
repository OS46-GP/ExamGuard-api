import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { QuestionService } from './question.service';
import { ExamGenerationService } from './exam-generation.service';

@Module({
  controllers: [ExamController],
  providers: [ExamService, QuestionService, ExamGenerationService],
})
export class ExamModule {}
