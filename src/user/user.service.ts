import { Injectable } from '@nestjs/common';
import { User } from "./schemas/user.schema";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(userId: string): Promise<User> {
    return this.userRepository.findOne({ _id: userId })
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async createUser(email: string, name: string, password: string): Promise<User> {
    return this.userRepository.create({
        email,
        name,
        password,
        isAdmin: false
    })
  }
}
