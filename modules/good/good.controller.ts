import { Controller, Get, Post, Patch, Delete, Body, Param, Req, Res, HttpStatus, Headers, Query} from '@nestjs/common';
import { GoodService } from './good.service';
import { ApiBody, ApiTags, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';


@ApiTags('Good')
@Controller('good')
@ApiBearerAuth('Authorization')
export class GoodController {
  constructor(private readonly goodService: GoodService) {}

  @Get('filteredGoods')
  @ApiResponse({ status: 200, description: 'Filtered goods.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiQuery({ name: 'category', required: false, description: 'Category to filter', type: String })
  @ApiQuery({ name: 'minPrice', required: false, description: 'Minimal price to filter', type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, description: 'Maximum price to filter', type: Number })
  getAllGoods(@Query() query: any) {
    return this.goodService.searchGoods(query);
  }

  @Get('sortedByDate')
  @ApiResponse({ status: 200, description: 'Goods sorted by date.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  goodsSortedByDate() {
    return this.goodService.goodsSortedByDate();
  }

  @Get('sortedByPrice')
  @ApiResponse({ status: 200, description: 'Goods sorted by price.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  goodsSortedByPrice() {
    return this.goodService.goodsSortedByPrice();
  }


  @Post('create')
  @ApiResponse({ status: 200, description: 'Good has been successfully added.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({
    required: true,
    description: 'Adding a new good.',
    schema: {
      type: 'object',
      example: {
        name: 'T-shirt',
        description: 'oversize clothes',
        category: 'clothes',
        price: '5500',
        image: 'base64_encoded_image_data',
        amount: '20',
      },
    },
  })
  createGood(@Body() createGoodDto: any) {
    return this.goodService.addGood(createGoodDto);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', required: true, description: 'Good ID', schema: { type: 'string' } })
  @ApiResponse({ status: 200, description: 'Good data has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({
    required: true,
    description: 'Updating a good.',
    schema: {
      type: 'object',
      example: {
        name: 'Jacket',
      },
    },
  })
  updateGood(@Param('id') id: string, @Body() updateGoodDto: any) {
    return this.goodService.updateGoodById(id, updateGoodDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true, description: 'Good ID', schema: { type: 'string' } })
  @ApiResponse({ status: 200, description: 'Good has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  deleteGood(@Param('id') id: string) {
    return this.goodService.deleteGoodById(id)
  }

}
