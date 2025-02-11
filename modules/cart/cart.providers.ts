import { Cart } from './cart.model';

export const cartProviders = [
  {
    provide: 'CART_REPOSITORY',
    useValue: Cart,
  },
];
