import { Request, Response } from 'express';
import { Entry } from '@entities/Entry';
import { Category } from '@entities/Category';
import dataSource from '@config/database';
import { Repository } from 'typeorm';
import { findEntryById } from '@services/entryServices';

/*
This controller handles CRUD operations for entries.
creating an entry (income or expense),
reading/getting an entry (or all) of a user (using the userId from the JWT access token),
updating/editing an entry,
deleting an entry,
*/

export class EntryController {
  /**
   * Creates a new entry (income or expense).
   */
  static async createEntry(req: Request, res: Response): Promise<void> {
    const { type, amount, currency, description, timestamp, category } = req.body;
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized: User ID is required.' });
      return;
    }

    if (!type || !amount || !currency || !category) {
      res.status(400).json({ error: 'Type, amount, currency, and category name are required.' });
      return;
    }

    const categoryRepository = dataSource.getRepository(Category);
    let categoryEntity;

    try {
      // Try to find the category by name (optionally scoped to user)
      categoryEntity = await categoryRepository.findOne({
        where: { name: category.name },
      });

      // If not found, create a new category
      if (!categoryEntity) {
        categoryEntity = categoryRepository.create({ name: category });
        categoryEntity = await categoryRepository.save(categoryEntity);
      }
    } catch (err) {
      res.status(500).json({ error: 'Error processing category.' });
      return;
    }

    const entry = Object.assign(new Entry(), {
      type,
      amount,
      currency,
      ...(timestamp ? { timestamp } : {}),
      ...(description && description.trim() ? { description } : {}),
      user: { id: userId },
      category: { id: categoryEntity.id },
    });

    const entryRepository = dataSource.getRepository(Entry);

    try {
      const savedEntry = await entryRepository.save(entry);
      // return the saved entry in the json response
      res.status(201).json(savedEntry);
      return;
    } catch (error) {
      res.status(500).json({ error: `Internal server error while creating entry: ${error}` });
      return;
    }
  }

  /**
   * Gets all entries of a user.
   */
  static async getEntries(req: Request, res: Response): Promise<void> {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized: User ID is required.' });
      return;
    }

    const entryRepository: Repository<Entry> = dataSource.getRepository(Entry);

    try {
      const entries = await entryRepository.find({
        where: { user: { id: userId } },
        relations: { category: true },
        order: { timestamp: 'DESC' },
      });
      res.status(200).json(entries);
    } catch (error) {
      res.status(500).json({ error: `Internal server error while fetching entries: ${error}` });
    }
  }

  /**
   * Edits/updates an entry.
   * This method will find an entry by its ID and update it with the provided data.
   */
  static async updateEntry(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const entry = await findEntryById(id);

    if (!entry) {
      res.status(404).json({ error: 'Entry not found.' });
      return;
    }

    const { type, amount, currency, description, timestamp, categoryId } = req.body;

    // update the entry with the new data
    if (type && type !== entry.type) {
      entry.type = type;
    }
    if (amount && amount !== entry.amount) {
      entry.amount = amount;
    }
    if (currency && currency !== entry.currency) {
      entry.currency = currency;
    }
    if (description && description.trim() !== entry.description) {
      entry.description = description;
    }
    if (timestamp && timestamp !== entry.timestamp) {
      entry.timestamp = timestamp;
    }
    if (categoryId && categoryId !== entry.category.id) {
      entry.category = { id: categoryId } as any; // assuming categoryId is valid
    }

    try {
      const entryRepository = dataSource.getRepository(Entry);
      const updatedEntry = await entryRepository.save(entry);

      res.status(200).json({ message: 'Entry updated successfully.', entry: updatedEntry });
    } catch (error) {
      res.status(500).json({ error: `Internal server error while updating entry: ${error}` });
      return;
    }
  }

  /**
   * Deletes an entry.
 
  */
}
