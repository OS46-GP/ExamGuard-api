import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ExamDocument = HydratedDocument<Exam>;

export type ExamStatus = 'draft' | 'published' | 'archived';

@Schema({ timestamps: true })
export class Exam {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  professorId!: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Question' }] })
  questionIds!: Types.ObjectId[];

  @Prop({ required: true, enum: ['draft', 'published', 'archived'], default: 'draft' })
  status!: ExamStatus;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
