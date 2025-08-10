import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import { Model } from 'mongoose';
import { TodoDto } from './dto/todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async getAllTodos() {
    try {
      const allTodos = await this.todoModel.find();
      return {
        success: true,
        message: 'All todos fetched successfully',
        data: allTodos,
      };
    } catch (error) {
      return error;
    }
  }

  async createTodo(todo: TodoDto) {
    try {
      const newTodo = await this.todoModel.create(todo);
      return {
        success: true,
        message: 'Todo created successfully',
        data: newTodo,
      };
    } catch (error) {
      return error;
    }
  }

  async getTodoForUserById(id: string) {
    try {
      const todo = await this.todoModel.find({ userId: id });
      return {
        success: true,
        message: 'Todo fetched successfully',
        data: todo,
      };
    } catch (error) {
      return error;
    }
  }
}
