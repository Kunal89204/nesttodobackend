import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';



@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAllUsers() {
    const allUsers = await this.userModel.find();
    return allUsers;
  }


  async createUser(userData: UserDto) {
    try {
      const newUser = await this.userModel.create(userData);
      return {
        success: true,
        message: 'User created successfully',
        data: newUser,
      };
    } catch (error) {
      return error.message;
    }
  }
}
