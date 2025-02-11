import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { Order } from '../order/order.model';
import { Good } from '../good/good.model';

@Table
export class OrderGood extends Model<OrderGood> {
  @ForeignKey(() => Order)
  @Column
  orderId: number;

  @ForeignKey(() => Good)
  @Column
  goodId: number;
}