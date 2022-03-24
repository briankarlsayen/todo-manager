import { Body, Controller, Get, Param, Patch, Post, Put, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') userId: string){
    return this.userService.getUserById(userId);
  }

  @Get()
  async getUsers(): Promise<User[]> {
      return await this.userService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto){
      return await this.userService.createUser(createUserDto)
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
