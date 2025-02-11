import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Cart } from '../cart/cart.model';
import { Order } from '../order/order.model';
import { CartGood } from '../cart-good/cartgood.model'
import { OrderGood } from '../order-good/ordergood.model'

@Table
export class Good extends Model<Good> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount: number;

  @BelongsToMany(() => Cart, () => CartGood)
  carts: Cart[];

  @BelongsToMany(() => Order, () => OrderGood)
  orders: Order[];
}
