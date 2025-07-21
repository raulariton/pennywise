import { Entry } from '@entities/Entry';
import dataSource from '@config/database';

export const findEntryById = async (id: string): Promise<Entry | null> => {
  try {
    return await dataSource.getRepository(Entry).findOneOrFail({
    where: { id },
    relations: {
      user: true,
      category: true
    }
  });
  } catch (error) {
    console.error('Error fetching entry by ID:', error);
    return null;
  }
};
