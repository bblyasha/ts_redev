import { Controller, Get, Post, Body, Req, Res, HttpException, HttpStatus, Headers } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('cart')
@ApiBearerAuth('Authorization')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @ApiResponse({ status: 200, description: 'Good has been successfully added to a cart.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({ 
      schema: { 
        properties: { 
        goodId: { type: 'number' }, 
        amount: { type: 'number' } 
        } 
      } 
    })
  async addToCart(
    @Headers() headers: any, 
    @Req() req: any, 
    @Res() res, 
    @Body() body: { goodId: number; amount: number }) {
    try {
      const authHeader = headers['authorization'];
      console.log(authHeader)
      if (!authHeader) {
        return res.status(HttpStatus.UNAUTHORIZED).send('Authorization header is missing');
      }
      console.log(req.user)
      const userId = req.user.id; 
      console.log('----USER_ID', userId)
      const { goodId, amount } = body;
      console.log('----goodId amount-----', goodId,amount)
      if (!userId || !goodId || !amount) {
        return res.status(HttpStatus.BAD_REQUEST).send('Bad request');
      }

      const cart = await this.cartService.addToCart(userId, goodId, amount);
      return res.status(HttpStatus.OK).json(cart);
      
    } catch (error) {
      console.error('Error adding item to cart:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
  }
}
