import { Request, Response } from 'express';
import { Category } from '@entities/Category';
import dataSource from '@config/database';

export class CategoryController {
  /**
   * Get all categories
   */
  static async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categoryRepository = dataSource.getRepository(Category);
      const categories = await categoryRepository.find({
        order: { name: 'ASC' },
      });

      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal server error while fetching categories' });
    }
  }
}
