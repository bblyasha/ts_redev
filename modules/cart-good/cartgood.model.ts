import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Cart } from '../cart/cart.model';
import { Good } from '../good/good.model';

@Table
export class CartGood extends Model<CartGood> {
  @ForeignKey(() => Cart)
  @Column
  cartId: number;

  @ForeignKey(() => Good)
  @Column
  goodId: number;
}
