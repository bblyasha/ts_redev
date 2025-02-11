import { Sequelize } from 'sequelize-typescript';
import { Cart } from '../modules/cart/cart.model';
import { Good } from '../modules/good/good.model';
import { Order } from '../modules/order/order.model';
import { Profile } from '../modules/profile/profile.model';
import { User } from '../modules/user/user.model';
import { CartGood } from '../modules/cart-good/cartgood.model';
import { OrderGood } from '../modules/order-good/ordergood.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'bblyasha',
        database: 'typescript-practice',
      });
      sequelize.addModels([User, Profile, Cart, Good, Order, CartGood, OrderGood]);
      // await sequelize.sync({ alter: true });
      console.log('-----Database connected-----')
      return sequelize;
    },
  },
];
