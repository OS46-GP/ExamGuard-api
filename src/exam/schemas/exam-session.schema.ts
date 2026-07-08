import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ExamSessionDocument = HydratedDocument<ExamSession>;

export type SessionStatus = 'in_progress' | 'submitted' | 'flagged';

class Answer {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Question' })
  questionId!: Types.ObjectId;

  @Prop({ required: true })
  selectedOptionIndex!: number;
}

@Schema({ timestamps: true })
export class ExamSession {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Exam' })
  examId!: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  studentId!: Types.ObjectId;

  @Prop({ required: true })
  startedAt!: Date;

  @Prop()
  submittedAt?: Date;

  @Prop({ type: [Answer], default: [] })
  answers!: Answer[];

  @Prop()
  integrityScore?: number;

  @Prop({
    required: true,
    enum: ['in_progress', 'submitted', 'flagged'],
    default: 'in_progress',
  })
  status!: SessionStatus;
}

export const ExamSessionSchema = SchemaFactory.createForClass(ExamSession);
ExamSessionSchema.index({ examId: 1, studentId: 1 });
