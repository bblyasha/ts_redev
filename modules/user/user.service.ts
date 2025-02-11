import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
  ) {}

  async createUser(user: Pick<User, 'email' | 'password'>): Promise<{ id: number; email: string; message: string }> {
    try {
      const newUser = await this.userModel.create(user);
      return {
        id: newUser.id,
        email: newUser.email,
        message: 'User created successfully',
      };;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; 
    }
  }

  async getOneUser(email: string): Promise<User | null> {
    try {
      return await this.userModel.findOne({ where: { email } });
    } catch (error) {
      console.error('Error finding user:', error);
      throw error; 
    }
  }
}
