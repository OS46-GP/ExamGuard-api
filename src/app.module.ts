import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ExamModule } from './exam/exam.module';
import { ProctoringModule } from './proctoring/proctoring.module';
import { RagModule } from './rag/rag.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    ExamModule,
    ProctoringModule,
    RagModule,
  ],
})
export class AppModule {}
