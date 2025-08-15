import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TodoDto {
  @ApiProperty({ description: 'User id of the todoist' })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Task of the user' })
  @IsNotEmpty()
  task: string;

  @ApiProperty({ description: 'Description of the task' })
  description: string;
}
