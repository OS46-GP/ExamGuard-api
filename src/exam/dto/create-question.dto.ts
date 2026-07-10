import {
  IsString,
  IsNumber,
  IsArray,
  IsEnum,
  ArrayMinSize,
  ArrayMaxSize,
  Min,
  Max,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({ example: 'What is 2 + 2?', description: 'Question text' })
  @IsString()
  @MinLength(1)
  questionText: string;

  @ApiProperty({
    example: ['1', '2', '3', '4'],
    description: 'Exactly 4 answer options',
  })
  @IsArray()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  options: string[];

  @ApiProperty({ example: 1, description: 'Index of the correct option (0-3)' })
  @IsNumber()
  @Min(0)
  @Max(3)
  correctOptionIndex: number;

  @ApiProperty({
    example: 'recall',
    enum: ['recall', 'application', 'analysis', 'synthesis'],
    description: 'Cognitive level',
  })
  @IsEnum(['recall', 'application', 'analysis', 'synthesis'])
  cognitiveLevel: 'recall' | 'application' | 'analysis' | 'synthesis';
}
