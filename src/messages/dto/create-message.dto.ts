import { IsEnum, IsString, IsArray, IsOptional } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  sessionId: string;

  @IsEnum(['user', 'assistant'])
  sender: 'user' | 'assistant';

  @IsString()
  content: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  context?: string[];
}