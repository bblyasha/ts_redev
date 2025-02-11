import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GoodController } from './good.controller';
import { GoodService } from './good.service';
import { Good } from './good.model';
import { OrderGood } from '../order-good/ordergood.model';  // Импорт модели OrderGood
import { CartGood } from '../cart-good/cartgood.model';  // Импорт модели CartGood
import { goodProviders } from './good.providers';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Good, OrderGood, CartGood]),  // Регистрируем модели
    DatabaseModule,
  ],
  controllers: [GoodController],
  providers: [GoodService, ...goodProviders],
})
export class GoodModule {}
