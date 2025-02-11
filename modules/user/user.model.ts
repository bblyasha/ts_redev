import { Table, Column, Model, DataType, HasOne, Index } from 'sequelize-typescript';
import { Profile } from '../profile/profile.model';
import { Cart } from '../cart/cart.model';


@Table
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Index({ unique: true })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @HasOne(() => Profile)
  profile: Profile;

  @HasOne(() => Cart)
  cart: Cart;
}
