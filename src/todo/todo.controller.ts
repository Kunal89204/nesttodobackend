import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './dto/todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Post()
  createTodo(@Body() body: TodoDto) {
    return this.todoService.createTodo(body);
  }

  @Get(':id')
  getTodoForUserById(@Param('id') id: string) {
    return this.todoService.getTodoForUserById(id);
  }
}
