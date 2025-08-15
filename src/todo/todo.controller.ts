import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './dto/todo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
// import { uploadOnCloudinary } from 'src/config/cloudinary.config';

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

  @Post('file/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/todos',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter(req, file, callback) {
        if (!file.mimetype.match(/^image\/(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed'), false);
        }
        callback(null, true);
      },
      limits: {
        fieldSize: 20 * 1024 * 1024,
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('requested', file.path);
    return file
  }

  @Get(':id')
  getTodoForUserById(@Param('id') id: string) {
    return this.todoService.getTodoForUserById(id);
  }

  @Delete(':id')
  deleteTodoById(@Param('id') id: string) {
    return this.todoService.deleteTodoById(id);
  }
}
