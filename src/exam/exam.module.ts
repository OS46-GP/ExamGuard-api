import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { QuestionService } from './question.service';
import { ExamGenerationService } from './exam-generation.service';
import { Exam, ExamSchema } from './schemas/exam.schema';
import { Question, QuestionSchema } from './schemas/question.schema';
import { ExamSession, ExamSessionSchema } from './schemas/exam-session.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Exam.name, schema: ExamSchema },
      { name: Question.name, schema: QuestionSchema },
      { name: ExamSession.name, schema: ExamSessionSchema },
    ]),
  ],
  controllers: [ExamController],
  providers: [ExamService, QuestionService, ExamGenerationService],
})
export class ExamModule {}
