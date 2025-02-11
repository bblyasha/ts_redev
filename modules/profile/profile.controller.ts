import { Controller, Get, Post, Put, Body, Req, Res, HttpStatus, Headers} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './profile.model';
import { ApiBody, ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('Profile')
@Controller('profile')
@ApiBearerAuth('Authorization')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('get')
  @ApiResponse({ status: 200, description: 'Good request.' })
  @ApiResponse({ status: 404, description: 'Data of profile not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async getProfile(@Headers() headers: any, @Req() req, @Res() res) {
    try {
      const authHeader = headers['authorization'];
      if (!authHeader) {
        return res.status(HttpStatus.UNAUTHORIZED).send('Authorization header is missing');
      }
      const userId = req.user.id
      const profile = await this.profileService.getUserProfile(userId)
      if (profile) {
        return res.status(HttpStatus.OK).json(profile);
      } else {
        return res.status(HttpStatus.NOT_FOUND).send('Data of profile not found');
      }
    } catch (error) {
      console.error('Error getting profile:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
  }

  @Post('create')
  @ApiResponse({ status: 201, description: 'Profile was created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({ 
    schema: { 
      properties: { 
      name: { type: 'string' }, 
      surname: { type: 'string' }, 
      lastname: { type: 'string' }, 
      phone: { type: 'string' } 
      } 
    } 
  })
  async createProfile(@Headers() headers: any, @Req() req, @Res() res, @Body() profileData: Profile) {
    try {
      const authHeader = headers['authorization'];
      if (!authHeader) {
        return res.status(HttpStatus.UNAUTHORIZED).send('Authorization header is missing');
      }
  
      console.log('---REQ.USER---',req.user)
      const userId = req.user.id
      const existingProfile = await this.profileService.getUserProfile(userId)
      if (existingProfile) {
        return res.status(HttpStatus.BAD_REQUEST).send('Profile already exists for this user')
      }
      const profile = await this.profileService.createUserProfile(userId, profileData);
      return res.status(HttpStatus.CREATED).send(profile);
    } catch (error) {
      console.error('Error creating profile:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }

  }

  @Put('update')
  @ApiResponse({ status: 200, description: 'Profile was updated successfully.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({ 
    schema: { 
      properties: { 
        name: { type: 'string' }, 
        surname: { type: 'string' }, 
        lastname: { type: 'string' }, 
        phone: { type: 'string' } 
      } 
    } 
  })
  async updateProfile(@Req() req, @Res() res, @Body() profileDataToUpdate: Profile) {
    try {
      const userId = req.user.id;
      console.log('-----', userId)
      const updatedProfile = await this.profileService.updateUserProfile(userId, profileDataToUpdate);
      return res.status(HttpStatus.OK).send(updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
  }
}
