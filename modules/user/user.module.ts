import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.model';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../../database/database.module';
import { Profile } from '../profile/profile.model'
import { Cart } from '../cart/cart.model'

@Module({
  imports: [
    SequelizeModule.forFeature([User, Profile, Cart]),
    DatabaseModule,
  ],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
})
export class UserModule {}
