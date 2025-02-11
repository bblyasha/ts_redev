import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from './order.model';
import { Good } from '../good/good.model';  
import { Cart } from '../cart/cart.model'
import { OrderGood } from '../order-good/ordergood.model';  
import { orderProviders } from './order.providers';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Order, Good, Cart, OrderGood]), 
    DatabaseModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, ...orderProviders],
})
export class OrderModule {}
