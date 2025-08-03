import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto {
   @ApiProperty({
    example: 'user123',
    description: 'The ID of the user creating the session',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'My First Chat',
    description: 'The title of the chat session',
    required: false,
  })
  @IsString()
  title?: string;
}