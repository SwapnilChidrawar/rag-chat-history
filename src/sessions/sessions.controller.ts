import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiHeader } from '@nestjs/swagger';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Sessions')
@Controller('sessions')
@UseGuards(ApiKeyGuard)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new chat session' })
  @ApiBody({ type: CreateSessionDto })
  @ApiResponse({ status: 201, description: 'Session created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
  })
  async create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get all sessions for a user' })
  @ApiParam({ name: 'userId', type: String })
  @ApiResponse({ status: 200, description: 'List of sessions.' })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
  })
  @Throttle({ default: { limit: 30, ttl: 60000 } }) 
  async findAll(@Param('userId') userId: string) {
    return this.sessionsService.findAll(userId);
  }

  @Get(':id/:userId')
  async findOne(@Param('id') id: string, @Param('userId') userId: string) {
    return this.sessionsService.findOne(id, userId);
  }

  @Put(':id/rename/:userId')
  async rename(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body('title') title: string,
  ) {
    return this.sessionsService.updateTitle(id, userId, title);
  }

  @Put(':id/favorite/:userId')
  async toggleFavorite(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ) {
    return this.sessionsService.toggleFavorite(id, userId);
  }

  @Delete(':id/:userId')
  async delete(@Param('id') id: string, @Param('userId') userId: string) {
    return this.sessionsService.delete(id, userId);
  }
}