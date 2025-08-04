import dataSource from '@config/database';
import { Category } from '@entities/Category';
import { Response } from 'express';

export async function getCategoryByName(
  categoryName: string,
) {
  const categoryRepository = dataSource.getRepository(Category);
  let categoryEntity;

  try {
    // Try to find the category by name
    categoryEntity = await categoryRepository.findOne({
      where: { name: categoryName },
    });

    if (!categoryEntity) {
      throw new Error(`Category "${categoryName}" doesn't exist.`);
    }
  } catch (err) {
    return null;
  }

  return categoryEntity;
}