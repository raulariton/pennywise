// src/controllers/BudgetController.ts
import { Request, Response } from 'express';
import dataSource from '@config/database';
import { BudgetPlan } from '@entities/Budget';
import { Entry, EntryType } from '@entities/Entry';
import { getCategoryByName } from '@services/categoryServices';

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

    try {
      const budgetRepo = dataSource.getRepository(BudgetPlan);
      const entryRepo = dataSource.getRepository(Entry);

      // Find all budget plans for the user
      const plans = await budgetRepo.find({
        where: { user: { id: userId } },
        relations: ['category'],
      });

      const result = await Promise.all(
        plans.map(async (plan) => {
          const entries = await entryRepo.find({
            where: {
              user: { id: userId },
              category: { id: plan.category.id },
              type: EntryType.EXPENSE,
            },
            order: { timestamp: 'DESC' },
            take: 10, // optional: only recent entries
            relations: { category: true },
          });

          const spent = entries.reduce((sum, e) => sum + e.amount, 0);

          return {
            category: plan.category.name,
            spent,
            budget: Number(plan.amount),
            transactions: entries.map((e) => ({
              label: e.description || e.category.name,
              amount: e.amount,
            })),
          };
        }),
      );

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch budgets', details: err });
    }
  }

  /**
   * Create a new budget plan for a category
   */
  static async createBudget(req: Request, res: Response): Promise<void> {
    const { amount, currency, categoryName, description, month } = req.body;
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized: User ID is required.' });
      return;
    }

    if (!amount || !currency || !categoryName || !month) {
      res.status(400).json({ error: 'Amount, currency, category name and month are required.' });
      return;
    }

    const category = await getCategoryByName(categoryName, res);

    // error response message is already handled in getCategoryByName
    if (!category) return;

    try {
      const budgetRepo = dataSource.getRepository(BudgetPlan);
      const plan = budgetRepo.create({
        category: { id: category.id } as any,
        user: { id: userId } as any,
        amount,
      });

      const saved = await budgetRepo.save(plan);
      res.status(201).json(saved);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create budget', details: err });
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
