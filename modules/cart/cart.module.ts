import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from './cart.model';
import { Good } from '../good/good.model';  // Импорт модели Good
import { CartGood } from '../cart-good/cartgood.model';  // Импорт модели CartGood
import { cartProviders } from './cart.providers';
import { DatabaseModule } from '../../database/database.module';
import { User } from '../user/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Cart, Good, CartGood, User]),  // Регистрируем модели
    DatabaseModule,
  ],
  controllers: [CartController],
  providers: [CartService, ...cartProviders],
})
export class CartModule {}
