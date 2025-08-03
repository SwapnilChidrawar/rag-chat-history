import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Session } from '../../sessions/schemas/session.schema';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Session', required: true })
  sessionId: Types.ObjectId;

  @Prop({ required: true, enum: ['user', 'assistant'] })
  sender: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String], default: [] })
  context: string[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);