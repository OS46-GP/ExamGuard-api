import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type QuestionDocument = HydratedDocument<Question>;

export type CognitiveLevel =
  | 'recall'
  | 'application'
  | 'analysis'
  | 'synthesis';

@Schema({ timestamps: true })
export class Question {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Exam' })
  examId!: Types.ObjectId;

  @Prop({ required: true })
  questionText!: string;

  @Prop({
    required: true,
    validate: {
      validator: (v: string[]) => v.length === 4,
      message: 'A question must have exactly 4 options',
      type: 'array' as const,
    },
  })
  options!: string[];

  @Prop({
    required: true,
    validate: {
      validator: (v: number) => v >= 0 && v <= 3,
      message: 'correctOptionIndex must be between 0 and 3',
    },
  })
  correctOptionIndex!: number;

  @Prop({
    required: true,
    enum: ['recall', 'application', 'analysis', 'synthesis'],
  })
  cognitiveLevel!: CognitiveLevel;

  @Prop()
  sourceChunkRef?: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
