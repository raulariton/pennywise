// controllers/FinancialGoalController.ts
import { Request, Response } from 'express';
import dataSource from '@config/database';
import { FinancialGoal } from '@entities/Goal';

export class FinancialGoalController {
  // Create a new financial goal
  static async createGoal(req: Request, res: Response): Promise<void> {
    const { title, targetAmount, dueDate } = req.body;
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized: User ID is required.' });
      return;
    }

    if (!title || !targetAmount) {
      res.status(400).json({ error: 'title and targetAmount are required fields.' });
      return;
    }

    try {
      const goalRepo = dataSource.getRepository(FinancialGoal);
      const goal = goalRepo.create({
        title,
        targetAmount,
        dueDate: dueDate ? new Date(dueDate) : null,
        user: { id: userId } as any,
      });

      const saved = await goalRepo.save(goal);
      res.status(201).json(saved);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create goal', details: err });
    }
  }

  // Get all goals for a user
  static async getGoals(req: Request, res: Response): Promise<void> {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    try {
      const goalRepo = dataSource.getRepository(FinancialGoal);
      const goals = await goalRepo.find({
        where: { user: { id: userId } },
        order: { createdAt: 'DESC' },
      });

      res.json(goals);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch goals', details: err });
    }
  }

  // Update a goal
  static async updateGoal(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, targetAmount, currentAmount, dueDate } = req.body;
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    try {
      const goalRepo = dataSource.getRepository(FinancialGoal);
      const goal = await goalRepo.findOne({
        where: { id: parseInt(id, 10), user: { id: userId } },
      });

      if (!goal) {
        res.status(404).json({ error: 'Goal not found' });
        return;
      }

      if (title !== undefined) goal.title = title;
      if (targetAmount !== undefined) goal.targetAmount = targetAmount;
      if (currentAmount !== undefined) goal.currentAmount = currentAmount;
      if (dueDate !== undefined) goal.dueDate = dueDate ? new Date(dueDate) : null;

      const updated = await goalRepo.save(goal);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update goal', details: err });
    }
  }

  // Delete a goal
  static async deleteGoal(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    try {
      const goalRepo = dataSource.getRepository(FinancialGoal);
      const goal = await goalRepo.findOne({
        where: { id: parseInt(id, 10), user: { id: userId } },
      });

      if (!goal) {
        res.status(404).json({ error: 'Goal not found' });
        return;
      }

      await goalRepo.remove(goal);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete goal', details: err });
    }
  }
}
