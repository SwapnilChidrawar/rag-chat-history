import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from './schemas/session.schema';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session.name) private readonly sessionModel: Model<Session>,
  ) {}

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const createdSession = new this.sessionModel({
      userId: createSessionDto.userId,
      title: createSessionDto.title || 'New Chat',
    });
    return createdSession.save();
  }

  async findAll(userId: string): Promise<Session[]> {
    return this.sessionModel.find({ userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Session> {
    return this.sessionModel.findOne({ _id: id, userId }).exec();
  }

  async updateTitle(id: string, userId: string, title: string): Promise<Session> {
    return this.sessionModel.findOneAndUpdate(
      { _id: id, userId },
      { title },
      { new: true },
    ).exec();
  }

  async toggleFavorite(id: string, userId: string): Promise<Session> {
    const session = await this.sessionModel.findOne({ _id: id, userId }).exec();
    if (!session) {
      throw new Error('Session not found');
    }
    session.isFavorite = !session.isFavorite;
    return session.save();
  }

  async delete(id: string, userId: string): Promise<Session> {
    return this.sessionModel.findOneAndDelete({ _id: id, userId }).exec();
  }
}