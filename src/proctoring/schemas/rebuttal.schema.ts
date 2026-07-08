import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RebuttalDocument = HydratedDocument<Rebuttal>;

export type RebuttalStatus = 'pending' | 'accepted' | 'rejected';

@Schema({ timestamps: true })
export class Rebuttal {
  @Prop({ required: true, type: Types.ObjectId, ref: 'ExamSession' })
  examSessionId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'IntegrityEvent' })
  integrityEventId?: Types.ObjectId;

  @Prop({ required: true })
  studentExplanation!: string;

  @Prop()
  professorResponse?: string;

  @Prop({
    required: true,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  })
  status!: RebuttalStatus;
}

export const RebuttalSchema = SchemaFactory.createForClass(Rebuttal);
RebuttalSchema.index({ examSessionId: 1 });
