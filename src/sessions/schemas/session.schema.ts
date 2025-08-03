import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Session extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, default: 'New Chat' })
  title: string;

  @Prop({ default: false })
  isFavorite: boolean;
}

export const SessionSchema = SchemaFactory.createForClass(Session);