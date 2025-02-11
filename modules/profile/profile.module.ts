import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Profile } from './profile.model';
import { profileProviders } from './profile.providers';
import { DatabaseModule } from '../../database/database.module';
import { User } from '../user/user.model'

@Module({
  imports: [
    SequelizeModule.forFeature([Profile, User]),
    DatabaseModule, // Импортируем DatabaseModule для доступа к провайдерам базы данных
  ],
  controllers: [ProfileController],
  providers: [ProfileService, ...profileProviders],
})
export class ProfileModule {}
