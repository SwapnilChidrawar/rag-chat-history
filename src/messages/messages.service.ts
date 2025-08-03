import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { Session } from '../sessions/schemas/session.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
    @InjectModel(Session.name) private readonly sessionModel: Model<Session>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    // Verify session exists
    const session = await this.sessionModel.findById(createMessageDto.sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    const createdMessage = new this.messageModel({
      sessionId: createMessageDto.sessionId,
      sender: createMessageDto.sender,
      content: createMessageDto.content,
      context: createMessageDto.context || [],
    });
    return createdMessage.save();
  }

  async findAllBySession(sessionId: string): Promise<Message[]> {
    return this.messageModel.find({ sessionId }).sort({ createdAt: 1 }).exec();
  }

  async deleteAllBySession(sessionId: string): Promise<void> {
    await this.messageModel.deleteMany({ sessionId }).exec();
  }
}