// src/controllers/BudgetController.ts
import { Request, Response } from 'express';
import dataSource from '@config/database';
import { BudgetPlan } from '@entities/Budget';
import { Entry, EntryType } from '@entities/Entry';
import { getCategoryByName } from '@services/categoryServices';
import { Category } from '@entities/Category';

function normalizeMonthDate(input: string): Date {
  // If input is "2025-08", add "-01"
  const normalized = input.length === 7 ? `${input}-01` : input;
  const date = new Date(normalized);

  // Normalize to the first of the month
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

export class BudgetController {
  /**
   * Get all budget cards for the current user
   */
  static async getBudgets(req: Request, res: Response): Promise<void> {
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized: User ID is required.' });
      return;
    }

    const monthParam = req.params.month; // <-- take from URL param
    if (!monthParam) {
      res
        .status(400)
        .json({ error: 'Month parameter is required in the URL (format: YYYY-MM-DD).' });
      return;
    }

    // Normalize month string into a Date object
    const month = normalizeMonthDate(monthParam);

    // Compute the start and end of the given month
    const startOfMonth = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth(), 1));
    const startOfNextMonth = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 1));

    try {
      const budgetRepo = dataSource.getRepository(BudgetPlan);
      const entryRepo = dataSource.getRepository(Entry);

      // Find all budget plans for the user for that specific month
      const plans = await budgetRepo.find({
        where: { user: { id: userId }, month },
        relations: ['category'],
      });

      const result = await Promise.all(
        plans.map(async (plan) => {
          const entries = await entryRepo
            .createQueryBuilder('entry')
            .leftJoinAndSelect('entry.category', 'category')
            .where('entry.userId = :userId', { userId })
            .andWhere('entry.categoryId = :categoryId', { categoryId: plan.category.id })
            .andWhere('entry.type = :type', { type: EntryType.EXPENSE })
            .andWhere('entry.timestamp >= :startOfMonth', { startOfMonth })
            .andWhere('entry.timestamp < :startOfNextMonth', { startOfNextMonth })
            .orderBy('entry.timestamp', 'DESC')
            .take(10)
            .getMany();

          const spent = entries.reduce((sum, e) => sum + e.amount, 0);

          return {
            category: plan.category.name,
            month: plan.month,
            spent,
            budget: Number(plan.amount),
            transactions: entries.map((e) => ({
              id: e.id,
              name: e.name,
              amount: e.amount,
              timestamp: e.timestamp,
              description: e.description,
              category: e.category.name,
            })),
          };
        }),
      );

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch budgets', details: err });
    }
  }

  static async getAllBudgets(req: Request, res: Response): Promise<void> {
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized: User ID is required.' });
      return;
    }

    try {
      const budgetRepo = dataSource.getRepository(BudgetPlan);
      const entryRepo = dataSource.getRepository(Entry);

      // Get all budget plans for the user (no month filter)
      const plans = await budgetRepo.find({
        where: { user: { id: userId } },
        relations: ['category'],
      });

      const result = await Promise.all(
        plans.map(async (plan) => {
          const month = new Date(plan.month);

          // Compute the start and end of that plan's month
          const startOfMonth = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth(), 1));
          const startOfNextMonth = new Date(
            Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 1),
          );

          // Fetch entries for that plan & month
          const entries = await entryRepo
            .createQueryBuilder('entry')
            .leftJoinAndSelect('entry.category', 'category')
            .where('entry.userId = :userId', { userId })
            .andWhere('entry.categoryId = :categoryId', { categoryId: plan.category.id })
            .andWhere('entry.type = :type', { type: EntryType.EXPENSE })
            .andWhere('entry.timestamp >= :startOfMonth', { startOfMonth })
            .andWhere('entry.timestamp < :startOfNextMonth', { startOfNextMonth })
            .orderBy('entry.timestamp', 'DESC')
            .take(10)
            .getMany();

          const spent = entries.reduce((sum, e) => sum + e.amount, 0);

          return {
            category: plan.category.name,
            month: plan.month,
            spent,
            budget: Number(plan.amount),
            transactions: entries.map((e) => ({
              id: e.id,
              name: e.name,
              amount: e.amount,
              timestamp: e.timestamp,
              description: e.description,
              category: e.category.name,
            })),
          };
        }),
      );

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch all budgets', details: err });
    }
  }

  /**
   * Create a new budget plan for a category
   */
  static async createBudget(req: Request, res: Response): Promise<void> {
    const { categoryName, amount, currency, month } = req.body;
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized: User ID is required.' });
      return;
    }

    if (!categoryName || !amount || !month || !currency) {
      res.status(400).json({ error: 'categoryName, amount, currency, and month are required fields.' });
      return;
    }

    try {
      const budgetRepo = dataSource.getRepository(BudgetPlan);

      // Find category by name
      const category = await getCategoryByName(categoryName)

      if (!category) {
        res.status(500).json({ error: 'Error processing category.' })
        return;
      }

      const plan = budgetRepo.create({
        category: { id: category.id } as any,
        user: { id: userId } as any,
        amount,
        month,
      });

      const saved = await budgetRepo.save(plan);
      res.status(201).json(saved);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create budget', details: err });
    }
  }

  /**
   * Utility function to create multiple budgets in bulk
   */
  static async createBulkBudgets(req: Request, res: Response): Promise<void> {
    const { budgets } = req.body; // budgets = [{ categoryName, amount, month }, ...]
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized: User ID is required.' });
      return;
    }

    if (!Array.isArray(budgets) || budgets.length === 0) {
      res.status(400).json({ error: 'budgets must be a non-empty array.' });
      return;
    }

    try {
      const categoryRepo = dataSource.getRepository(Category);
      const budgetRepo = dataSource.getRepository(BudgetPlan);

      const results = [];

      for (const budgetData of budgets) {
        const { categoryName, amount, month } = budgetData;

        if (!categoryName || !amount || !month) {
          continue; // skip invalid entries
        }

        // Find category by name
        const category = await categoryRepo.findOne({
          where: { name: categoryName },
        });

        if (!category) {
          // Optionally, skip or return error; here we skip
          console.warn(`Category '${categoryName}' not found, skipping.`);
          continue;
        }

        const plan = budgetRepo.create({
          category: { id: category.id } as any,
          user: { id: userId } as any,
          amount,
          month,
        });

        const saved = await budgetRepo.save(plan);
        results.push(saved);
      }

      res.status(201).json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create budgets', details: err });
    }
  }

  /**
   * (Optional) Update budget amount
   */
  static async updateBudget(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { amount } = req.body;

    try {
      const budgetRepo = dataSource.getRepository(BudgetPlan);
      const plan = await budgetRepo.findOne({ where: { id } });

      if (!plan) {
        res.status(404).json({ error: 'Budget plan not found.' });
        return;
      }

      plan.amount = amount;
      const updated = await budgetRepo.save(plan);

      res.status(200).json({ message: 'Budget updated', budget: updated });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update budget', details: err });
    }
  }
}
