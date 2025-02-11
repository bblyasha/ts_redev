import { Injectable, Inject } from '@nestjs/common';
import { Cart } from './cart.model'
import { Good } from '../good/good.model'
import { CartGood } from '../cart-good/cartgood.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private readonly cartModel: typeof Cart,
    @InjectModel(Good)
    private readonly goodModel: typeof Good,
    @InjectModel(CartGood)
    private readonly cartGoodModel: typeof CartGood,  
  ) {}
    
  async addToCart(userId: number, goodId: number, amount: number) {
    try {
      const good = await this.goodModel.findByPk(goodId)
      if (!good) {
        console.error('Good not found:', goodId);
        throw new Error('Good not found')
      }

      // Проверить доступное количество
      if (good.amount - amount < 0) {
        console.error('Not enough goods in stock:', good.amount);
        throw new Error('Not enough goods in stock')
      }

      // Вычислить итоговую цену
      const summedPrice = good.price * amount;

      good.amount -= amount;
      await good.save();

      let cart = await this.cartModel.findOne({
        where: { userId },
        include: [Good],
      });

      if (!cart) {
        // Если корзины нет, создаем новую
        cart = await this.cartModel.create({
          userId,
          amount,
          summedPrice,
        });
      } else {
        // Если корзина есть, обновляем данные
        cart.amount += amount
        cart.summedPrice += summedPrice
        await cart.save()
      }

      console.log('Cart ID:', cart?.id);
      console.log('Good ID:', goodId);

      if (!goodId || !cart.id) {
        throw new Error('Good ID or cart ID is undefined');
      }
      
      const [cartGood, created] = await this.cartGoodModel.findOrCreate({
        where: { cartId: cart.id, goodId }
      });

      if (!created) {
        console.log(`Good ${goodId} is already in cart ${cart.id}`);
      }

      return cart

      // const cartItem = await this.cartModel.create({
      //   userId,
      //   amount,
      //   summedPrice,
      // });

      // await cartItem.$add('goods', good);

      // return cartItem;
    } catch (error) {
      console.error('Error in addToCart:', error);
      throw new Error('Error adding to cart');
    }
  }
}
