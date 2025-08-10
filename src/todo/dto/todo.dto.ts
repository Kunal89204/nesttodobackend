import { IsNotEmpty } from 'class-validator';

export class TodoDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  task: string;

  description: string;
}
