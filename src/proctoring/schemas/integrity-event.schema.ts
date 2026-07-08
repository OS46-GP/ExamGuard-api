import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';

export type IntegrityEventDocument = HydratedDocument<IntegrityEvent>;

export type EventType = 'gaze' | 'tab_switch';

@Schema({ timestamps: true })
export class IntegrityEvent {
  @Prop({ required: true, type: Types.ObjectId, ref: 'ExamSession' })
  examSessionId!: Types.ObjectId;

  @Prop({ required: true, enum: ['gaze', 'tab_switch'] })
  type!: EventType;

  @Prop({ default: Date.now })
  timestamp!: Date;

  @Prop()
  confidence?: number;

  @Prop({ type: MongooseSchema.Types.Mixed })
  metadata!: Record<string, any>;
}

export const IntegrityEventSchema = SchemaFactory.createForClass(IntegrityEvent);
IntegrityEventSchema.index({ examSessionId: 1, timestamp: -1 });
