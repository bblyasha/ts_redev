import { Order } from './order.model';

export const orderProviders = [
  {
    provide: 'ORDER_REPOSITORY',
    useValue: Order,
  },
];
