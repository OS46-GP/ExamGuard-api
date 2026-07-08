import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ExamModule } from './exam/exam.module';
import { ProctoringModule } from './proctoring/proctoring.module';
import { RagModule } from './rag/rag.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/examguard',
    ),
    AuthModule,
    UsersModule,
    ExamModule,
    ProctoringModule,
    RagModule,
  ],
})
export class AppModule {}
