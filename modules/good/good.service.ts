import { Injectable, Inject } from '@nestjs/common';
import { Good } from './good.model';
import { InjectModel } from '@nestjs/sequelize';
import { error } from 'console';

@Injectable()
export class GoodService {
  constructor(
    @InjectModel(Good)
    private readonly goodModel: typeof Good,
  ) {}


  async addGood(goodData: {name: string }): Promise<Good> {
    try {
      const newGood = await this.goodModel.create(goodData)
      return newGood
    } catch (error) {
      console.error('Error adding good:', error);
      throw new Error('Error adding good');
    }
  }


  async deleteGoodById(id: string): Promise<number> {
    try {
      const deletedGood = await this.goodModel.destroy({
        where: { id },
      });
      return deletedGood;
    } catch (error) {
      console.error('Error deleting good:', error);
      throw new Error('Error deleting good');
    }
  }

  async updateGoodById(id: string, newData: { name?: string; category?: string; price?: number }): Promise<[number, Good[]]> {
    try {
      const updatedGood = await this.goodModel.update(newData, {
        where: { id },
        returning: true,
      });
      return updatedGood;
    } catch (error) {
      console.error('Error updating good:', error);
      throw new Error('Error updating good');
    }
  }
  


  async searchGoods(category?: string, minPrice?: number, maxPrice?: number): Promise<Good[]> {
    try {
      const whereCondition: any = {};
      
      if (category) whereCondition.category = category;
      
      if (minPrice !== undefined && maxPrice !== undefined) {
        whereCondition.price = { minPrice, maxPrice };
      } else if (minPrice !== undefined) {
        whereCondition.price = { minPrice };
      } else if (maxPrice !== undefined) {
        whereCondition.price = { maxPrice };
      }

      return await this.goodModel.findAll({ where: whereCondition });
    } catch (error) {
      console.error('Error searching goods:', error);
      throw new Error('Error searching goods');
    }
  }

  async goodsSortedByPrice(): Promise<Good[]> {
    try {
      return await this.goodModel.findAll({ order: [['price', 'ASC']] });
    } catch (error) {
      console.error('Error fetching goods sorted by price:', error);
      throw new Error('Error fetching goods sorted by price');
    }
  }

  async goodsSortedByDate(): Promise<Good[]> {
    try {
      return await this.goodModel.findAll({ order: [['createdAt', 'DESC']] });
    } catch (error) {
      console.error('Error fetching goods sorted by date:', error);
      throw new Error('Error fetching goods sorted by date');
    }
  }
}
