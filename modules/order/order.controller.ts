import { Controller, Post, Patch, Get, Body, Param, Req, Res, HttpException, HttpStatus, Headers} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.model';
import { ApiBody, ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

@ApiTags('Order')
@Controller('orders')
@ApiBearerAuth('Authorization')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async getOrders(@Headers() headers: any, @Req() req: any, @Res() res) {
    try {
      const authHeader = headers['authorization'];
      if (!authHeader) {
        return res.status(HttpStatus.UNAUTHORIZED).send('Authorization header is missing');
      }
      const userId = req.user.id
      if (!userId) {
        throw new HttpException('User not authorized', HttpStatus.UNAUTHORIZED);
      }

      return await this.orderService.getOrders(userId);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Order created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({
    schema: {
      properties: {
        deliveryAddress: { type: 'string' },
        paymentMethod: { type: 'string' },
        status: { type: 'string' },
      }
    }
  })
  async createOrder(
    @Headers() headers: any,
    @Req() req,
    @Res() res,
    @Body() body: { deliveryAddress: string; paymentMethod: string; status: string },
  ) {
    try {
      const authHeader = headers['authorization'];
      if (!authHeader) {
        return res.status(HttpStatus.UNAUTHORIZED).send('Authorization header is missing');
      }
      console.log('------REQ_USER', req.user)
      const userId = req.user.id;
      console.log('------USER_ID', userId)
      const { deliveryAddress, paymentMethod, status } = body;

      if (!userId || !deliveryAddress || !paymentMethod || !status) {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }

      return await this.orderService.createOrder(userId, deliveryAddress, paymentMethod, status);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id/status')
  @ApiResponse({ status: 200, description: 'Order status updated successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({
    schema: {
      properties: {
        deliveryAddress: { type: 'string' },
        paymentMethod: { type: 'string' },
        status: { type: 'string' },
      }
    }
  })
  async updateOrderStatus(
    @Param('id') orderId: number,
    @Body() body: { status: string },
  ) {
    try {
      const { status } = body;
      return await this.orderService.updateOrderStatus(orderId, status);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
