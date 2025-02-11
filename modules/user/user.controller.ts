import { Controller, Post, Body, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';


@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {} 

  @Post('login')
  @ApiBody({ schema: { properties: { email: { type: 'string' }, password: { type: 'string' } } } })
  @ApiResponse({ status: 201, description: 'Login successful. Returns a JWT token.' })
  @ApiResponse({ status: 401, description: 'Incorrect login or password.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    try {
      const user = await this.userService.getOneUser(email);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new HttpException('Incorrect login or password', HttpStatus.UNAUTHORIZED);
      }
      const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);
      return { token };
    } catch (error) {
      console.error('Error:', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiTags('User')
  @Post('register')
  @ApiResponse({ status: 201, description: 'User was created.' })
  @ApiResponse({ status: 400, description: 'Bad request. User already exists.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({ schema: { properties: { email: { type: 'string' }, password: { type: 'string' } } } })
  async register(@Body() body: { email: string; password: string }) {
    console.log(body)
    const { email, password } = body;
    try {
      const existingUser = await this.userService.getOneUser(email);
      if (!existingUser) {
        const saltRounds = 10;
        const hashPass = await bcrypt.hash(password, saltRounds);
        const newUser = await this.userService.createUser({ email, password: hashPass });
        return newUser;
      } else {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      console.error('Error:', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}