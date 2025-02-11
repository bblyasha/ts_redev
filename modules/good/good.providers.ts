import { Good } from './good.model';

export const goodProviders = [
  {
    provide: 'GOOD_REPOSITORY',
    useValue: Good,
  },
];
