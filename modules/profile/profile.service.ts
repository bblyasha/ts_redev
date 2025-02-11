import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from './profile.model';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile)
    private readonly profileModel: typeof Profile,
  ) {}

  async getUserProfile(userId: number): Promise<Profile | null  > {
    try {
      return await this.profileModel.findOne({ where: { userId } })
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw new Error('Error fetching profile');
    }
  }

  async createUserProfile(userId: number, profileData: Partial<Profile>): Promise<Profile> {
    try {
      return this.profileModel.create({ userId, ...profileData });
    } catch (error) {
      console.error('Error creating profile:', error);
      throw new Error('Error creating profile');
    }
  }

  async updateUserProfile(userId: number, profileDataToUpdate: Partial<Profile>): Promise<Profile> {
    try {
      const profile = await this.getUserProfile(userId);
      if (!profile) {
        throw new Error('Profile not found');
      }
      return await profile.update(profileDataToUpdate);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new Error('Error updating profile');
    }
  }
}
