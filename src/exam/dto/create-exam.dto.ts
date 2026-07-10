import { IsString, IsOptional, IsEnum, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type { ExamStatus } from '../schemas/exam.schema';

export class CreateExamDto {
  @ApiProperty({ example: 'Midterm Exam', description: 'Exam title' })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({
    example: 'draft',
    enum: ['draft', 'published', 'archived'],
    required: false,
    default: 'draft',
  })
  @IsOptional()
  @IsEnum(['draft', 'published', 'archived'])
  status?: ExamStatus;
}
