import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get All users' })
  getAllUsers() {
    return this.usersService.findAllUsers();
  }

  @ApiOperation({ summary: 'Create users' })
  @Post()
  createNewUser(@Body() body: UserDto) {
    return this.usersService.createUser(body);
  }
}
