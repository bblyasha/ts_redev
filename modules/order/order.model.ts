import { Table, Column, Model, DataType, BelongsTo, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Good } from '../good/good.model';
import { OrderGood } from '../order-good/ordergood.model'

@Table
export class Order extends Model<Order> {
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
  status: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  deliveryAddres: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  paymentMethod: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  totalPrice: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Good, () => OrderGood)
  goods: Good[];
}
