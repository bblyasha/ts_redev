import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { Cart } from '../cart/cart.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
    @InjectModel(Cart)
    private readonly cartModel: typeof Cart
  ) {}

  async createOrder(userId: number, deliveryAddres: string, paymentMethod: string, status: string) {
    try {
      const cartItems = await this.cartModel.findAll({ where: { userId } });

      if (!cartItems.length) {
        throw new Error('Cart is empty', );
      }

      const totalPrice = cartItems.reduce((total, item) => total + item.summedPrice, 0);

      const order = await this.orderModel.create({
        userId,
        deliveryAddres,
        paymentMethod,
        status,
        totalPrice,
      });

      await this.cartModel.destroy({ where: { userId } });

      return order;
    } catch (error) {
      throw new Error(error.message || 'Failed to create order');
    }
  }

  async updateOrderStatus(orderId: number, status: string) {
    try {
      const order = await this.orderModel.findByPk(orderId);
      if (!order) {
        throw new Error('Order not found');
      }
      order.status = status;
      await order.save();

      return order;
    } catch (error) {
      throw new Error(error.message || 'Failed to update order status');
    }
  }

  async getOrders(userId: number) {
    try {
      return await this.orderModel.findAll({ where: { userId } });
    } catch (error) {
      throw new Error(error.message || 'Failed to get orders');
    }
  }
}
