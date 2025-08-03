import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';

@Controller('messages')
@UseGuards(ApiKeyGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get(':sessionId')
  async findAllBySession(@Param('sessionId') sessionId: string) {
    return this.messagesService.findAllBySession(sessionId);
  }

  @Delete(':sessionId')
  async deleteAllBySession(@Param('sessionId') sessionId: string) {
    await this.messagesService.deleteAllBySession(sessionId);
    return { message: 'All messages for session deleted' };
  }
}