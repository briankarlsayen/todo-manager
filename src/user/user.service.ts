import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from "./schemas/user.schema";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>) {}

  async getUserById(userId: string): Promise<User> {
    return this.model.findOne({ _id: userId }).exec()
  }

  async getUsers(): Promise<User[]> {
    return this.model.find().exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await new this.model({...createUserDto}).save()
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.model.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async delete(id: string): Promise<User> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
