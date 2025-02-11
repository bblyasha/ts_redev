import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt'
import { SequelizeModule } from '@nestjs/sequelize';
import { CartModule } from './modules/cart/cart.module';
import { GoodModule } from './modules/good/good.module';
import { OrderModule } from './modules/order/order.module';
import { ProfileModule } from './modules/profile/profile.module';
import { UserModule } from './modules/user/user.module';
import { OrderGood } from './modules/order-good/ordergood.model';
import { DatabaseModule } from './database/database.module';
import { AuthMiddleware } from './middlewares/auth.middleware'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'bblyasha',
      database: 'typescript-practice',
      autoLoadModels: true,
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'mySecretKey'
    }),
    DatabaseModule,
    CartModule,
    GoodModule,
    OrderModule,
    ProfileModule,
    UserModule,
    OrderGood
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('profile', 'cart', 'order');
  }
}
