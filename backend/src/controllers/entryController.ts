import { Request, Response } from 'express';
import { Entry } from '@entities/Entry';
import { Category } from '@entities/Category';
import dataSource from '@config/database';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { convertCurrency, findEntryById } from '@services/entryServices';
import { round } from 'reliable-round';

/*
This controller handles CRUD operations for entries.
creating an entry (income or expense),
reading/getting an entry (or all) of a user (using the userId from the JWT access token),
updating/editing an entry,
deleting an entry,
*/

interface DashboardMetrics {
  totalIncomeThisMonth: number;
  totalExpensesThisMonth: number;

  incomeDifference: number;
  incomePercentChange: number;
  expenseDifference: number;
  expensePercentChange: number;

  insights: {
    income: string;
    expenses: string;
  };

  topSpendingCategoryThisMonth: {
    category: string;
    amount: number;
  } | null;
}

export class EntryController {
  /**
   * Creates a new entry (income or expense).
   */
  static async createEntry(req: Request, res: Response): Promise<void> {
    const { type, name, amount, currency, description, timestamp, category } = req.body;
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized: User ID is required.' });
      return;
    }

    if (!type || !name || !amount || !currency || !timestamp || !category) {
      res.status(400).json({
        error: 'Type, name, amount, currency, timestamp, and category name are required.',
      });
      return;
    }

    const categoryRepository = dataSource.getRepository(Category);
    let categoryEntity;

    try {
      // Try to find the category by name (optionally scoped to user)
      categoryEntity = await categoryRepository.findOne({
        where: { name: category },
      });

      if (!categoryEntity) {
        throw new Error(`Category "${category}" doesn't exist.`);
      }
    } catch (err) {
      res.status(500).json({ error: 'Error processing category.' });
      return;
    }

    const entry = Object.assign(new Entry(), {
      type:type,
      name: name.trim(),
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

  static async createBulkEntry(req: Request, res: Response): Promise<void> {
    const { entries } = req.body;
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized: User ID is required.' });
      return;
    }

    if (!Array.isArray(entries) || entries.length === 0) {
      res.status(400).json({ error: 'Entries must be a non-empty array.' });
      return;
    }

    const categoryRepository = dataSource.getRepository(Category);
    const entryRepository = dataSource.getRepository(Entry);

    try {
      const savedEntries = await Promise.all(
        entries.map(async (entryData: any) => {
          const { type, name, amount, currency, description, timestamp, category } = entryData;

          // Validate required fields
          if (!type || !name || !amount || !currency || !timestamp || !category) {
            throw new Error(
              'Type, name, amount, currency, timestamp, and category name are required for each entry.',
            );
          }

          // Find category
          const categoryEntity = await categoryRepository.findOne({
            where: { name: category },
          });

          if (!categoryEntity) {
            throw new Error(`Category "${category}" doesn't exist.`);
          }

          // Create entry
          const entry = Object.assign(new Entry(), {
            type,
            name: name.trim(),
            amount,
            currency,
            timestamp,
            ...(description && description.trim() ? { description } : {}),
            user: { id: userId },
            category: { id: categoryEntity.id },
          });

          return entryRepository.save(entry);
        }),
      );

      res.status(201).json(savedEntries);
    } catch (error: any) {
      res.status(500).json({
        error: 'Failed to create bulk entries',
        details: error.message || error,
      });
    }
  }

  /**
   * Gets all entries of a user.
   */
  static async getEntries(req: Request, res: Response): Promise<void> {
    const userId = (req as any).user?.id;

    const limit = req.query?.limit as unknown as number;

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
        take: limit ?? undefined,
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

    const { type, name, amount, currency, description, timestamp, categoryId } = req.body;

    // update the entry with the new data
    if (type && type !== entry.type) {
      entry.type = type;
    }
    if (name && name.trim() !== entry.name) {
      entry.name = name.trim();
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

  static async getMonthlyCashFlow(req: Request, res: Response): Promise<void> {
    const userId = (req as any).user?.id;
    const currency: string = req.query?.currency as string;

    if (!currency) {
      res.status(400).json({ error: 'Currency is required.' });
      return;
    }

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized: User ID is required.' });
      return;
    }

    const entryRepository: Repository<Entry> = dataSource.getRepository(Entry);

    try {
      const entries = await entryRepository.find({
        where: { user: { id: userId } },
        relations: { category: true },
        order: { timestamp: 'ASC' },
      });

      if (entries.length === 0) {
        res.status(200).json([]);
        return;
      }

      // grouping entries by month (YYYY-MM format)
      const monthlyCashFlow: Record<string, { income: number; expense: number }> = {};

      for (const entry of entries) {
        if (entry.currency !== currency) {
          try {
            entry.amount = await convertCurrency(entry.amount, entry.currency, currency);
          } catch (error) {
            res.status(500).json({ error: `Error converting currency: ${error}` });
            return;
          }
        }

        const month = new Date(entry.timestamp).toISOString().slice(0, 7);

        if (!monthlyCashFlow[month]) {
          monthlyCashFlow[month] = { income: 0, expense: 0 };
        }
        if (entry.type === 'income') {
          monthlyCashFlow[month].income += entry.amount;
        } else if (entry.type === 'expense') {
          monthlyCashFlow[month].expense += entry.amount;
        }
      }

      // filter only entries from the current year
      const currentYear = new Date().getFullYear();
      const entriesMadeThisYear = Object.keys(monthlyCashFlow).filter((yearAndMonth) =>
        yearAndMonth.startsWith(currentYear.toString()),
      );

      // if no entries were made this year, return an empty array
      if (entriesMadeThisYear.length === 0) {
        res.status(200).json([]);
        return;
      }

      // map the entries to the desired format
      const monthlyCashFlowThisYear = entriesMadeThisYear.map((yearAndMonth) => {
        const [year, month] = yearAndMonth.split('-');
        return {
          month: new Date(`${year}-${month}-01`).toLocaleString('en', { month: 'long' }),
          income: round(monthlyCashFlow[yearAndMonth].income, 2),
          expense: round(monthlyCashFlow[yearAndMonth].expense, 2),
        };
      });

      // fill the monthlyCashFlow object with 0 income/expense for months with no entries
      fillArrayWithMonths(monthlyCashFlowThisYear);

      res.status(200).json(monthlyCashFlowThisYear);
    } catch (error) {
      res
        .status(500)
        .json({ error: `Internal server error while fetching monthly cash flow: ${error}` });
    }
  }

  static async getDashboardMetrics(req: Request, res: Response): Promise<void> {
    // get preferred currency from the request body
    const currency: string = req.query?.currency as string;

    if (!currency) {
      res.status(400).json({ error: 'Currency is required.' });
      return;
    }

    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized: User ID is required.' });
      return;
    }

    const entryRepository: Repository<Entry> = dataSource.getRepository(Entry);

    // get entries from current month (if any)
    // and from last month (if any)
    try {
      // startDate: first day of last month
      // endDate: last day of last month
      const startDate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
      const endDate = new Date();

      const entriesPastTwoMonths = await entryRepository.find({
        where: {
          user: { id: userId },
          timestamp: Between(startDate, endDate),
        },
        order: { timestamp: 'ASC' },
        relations: { category: true },
      });

      if (entriesPastTwoMonths.length === 0) {
        res.status(200).json({
          totalIncomeThisMonth: 0,
          totalExpensesThisMonth: 0,

          incomeDifference: 0,
          incomePercentChange: 0,
          expenseDifference: 0,
          expensePercentChange: 0,

          // frontend displays 'No insights available right now.'
          // after seeing that string is empty
          insights: {
            income: '',
            expenses: '',
          },

          topSpendingCategoryThisMonth: null,
        } satisfies DashboardMetrics);
        return;
      }

      // filter entries from this month
      const entriesThisMonth = entriesPastTwoMonths.filter((entry) => {
        const entryDate = new Date(entry.timestamp);
        return entryDate.getMonth() === new Date().getMonth();
      });
      // convert all entries to the preferred currency
      for (const entry of entriesThisMonth) {
        if (entry.currency !== currency) {
          try {
            entry.amount = await convertCurrency(entry.amount, entry.currency, currency);
          } catch (error) {
            res.status(500).json({ error: `Error converting currency: ${error}` });
          }
        }
      }

      // filter entries from the past two months
      const entriesLastMonth = entriesPastTwoMonths.filter((entry) => {
        const entryDate = new Date(entry.timestamp);
        return entryDate.getMonth() === new Date().getMonth() - 1;
      });
      // convert all entries to the preferred currency
      for (const entry of entriesLastMonth) {
        if (entry.currency !== currency) {
          try {
            entry.amount = await convertCurrency(entry.amount, entry.currency, currency);
          } catch (error) {
            res.status(500).json({ error: `Error converting currency: ${error}` });
          }
        }
      }

      // calculate total income and expenses for this month
      const totalIncomeThisMonth = entriesThisMonth
        .filter((entry) => entry.type === 'income')
        .reduce((total, entry) => total + entry.amount, 0);

      const expensesThisMonth = entriesThisMonth.filter((entry) => entry.type === 'expense');
      const totalExpensesThisMonth = expensesThisMonth.reduce(
        (total, entry) => total + entry.amount,
        0,
      );

      // calculate total income and expenses for last month
      const totalIncomeLastMonth = entriesLastMonth
        .filter((entry) => entry.type === 'income')
        .reduce((total, entry) => total + entry.amount, 0);
      const totalExpensesLastMonth = entriesLastMonth
        .filter((entry) => entry.type === 'expense')
        .reduce((total, entry) => total + entry.amount, 0);

      // get all expense categories
      const expenseCategories = expensesThisMonth.reduce(
        (acc, entry) => {
          // find the category in the accumulator
          const category = acc.find((cat) => cat.category === entry.category.name);

          if (category) {
            // if the category exists, add the amount to it
            category.amount += entry.amount;
          } else {
            // if the category does not exist, create a new one
            acc.push({ category: entry.category.name, amount: entry.amount });
          }
          return acc;
        },
        [] as { category: string; amount: number }[],
      );

      // sort expense categories by amount in descending order to find the top spending category
      expenseCategories.sort((a, b) => b.amount - a.amount);

      // get the top spending category for this month
      // but first round the amount to 2 decimal places
      if (expenseCategories.length > 0) {
        expenseCategories[0].amount = Math.round(expenseCategories[0].amount * 100) / 100;
      }
      const topSpendingCategoryThisMonth =
        expenseCategories.length > 0 ? expenseCategories[0] : null;

      // there is a difference only when the total income or expenses between the two months
      // is not 0
      let incomeDifference = 0,
        expenseDifference = 0;
      let incomePercentChange = 0,
        expensePercentChange = 0;
      if (totalIncomeThisMonth === 0 || totalIncomeLastMonth === 0) {
        incomeDifference = 0;
        incomePercentChange = 0;
      } else {
        incomeDifference = totalIncomeThisMonth - totalIncomeLastMonth;
        incomePercentChange = (incomeDifference / totalIncomeLastMonth) * 100;
      }
      if (totalExpensesLastMonth === 0 || totalExpensesLastMonth === 0) {
        expenseDifference = 0;
        expensePercentChange = 0;
      } else {
        expenseDifference = totalExpensesThisMonth - totalExpensesLastMonth;
        expensePercentChange = (expenseDifference / totalExpensesLastMonth) * 100;
      }

      // return the dashboard metrics
      res.status(200).json({
        totalIncomeThisMonth: round(totalIncomeThisMonth, 2),
        totalExpensesThisMonth: round(totalExpensesThisMonth, 2),

        incomeDifference: incomeDifference,
        incomePercentChange: incomePercentChange,
        expenseDifference: round(expenseDifference, 2),
        expensePercentChange: round(expensePercentChange, 2),

        insights: getPersonalizedMessageFromMonthComparison({
          totalIncomeThisMonth: round(totalIncomeThisMonth, 2),
          totalExpensesThisMonth: round(totalExpensesThisMonth, 2),
          totalIncomeLastMonth: round(totalIncomeLastMonth, 2),
          totalExpensesLastMonth: round(totalExpensesLastMonth, 2),
        }),

        topSpendingCategoryThisMonth,
      } satisfies DashboardMetrics);
    } catch (error) {
      res
        .status(500)
        .json({ error: `Internal server error while fetching dashboard metrics: ${error}` });
    }
  }
}

function fillArrayWithMonths(array: { month: string; income: number; expense: number }[]): void {
  // NOTE: This function assumes that the array is sorted by month in ascending order.
  for (let i = array.length - 1; i >= 0; i--) {
    // get month in M format  (0 for January, 1 for February, etc.)
    const monthIndex = new Date(`${array[i].month} 1, 2000`).getMonth();

    if (monthIndex === 0) {
      // if the month is January, we cannot check for the previous month
      return;
    }

    // check if the previous month exists in the array
    const prevMonthExists = array.some((monthEntry) => {
      // get the month in M format (0 for January, 1 for February, etc.)
      const monthEntryIndex = new Date(`${monthEntry.month} 1 2000`).getMonth();

      // check if the previous month exists in the array
      return monthEntryIndex === monthIndex - 1;
    });

    if (!prevMonthExists) {
      // add the previous month to the array
      const prevMonthString = new Date(
        new Date(`${array[i].month} 1, 2000`).setMonth(monthIndex - 1),
      ).toLocaleString('en', { month: 'long' });
      array.splice(i, 0, {
        month: prevMonthString,
        income: 0,
        expense: 0,
      });
      i++; // increment i to avoid skipping the previous month we just added
    }
  }
}

function getPersonalizedMessageFromMonthComparison({
  totalIncomeThisMonth,
  totalExpensesThisMonth,
  totalIncomeLastMonth,
  totalExpensesLastMonth,
}: {
  totalIncomeThisMonth: number;
  totalExpensesThisMonth: number;
  totalIncomeLastMonth: number;
  totalExpensesLastMonth: number;
}) {
  const incomeDifference = totalIncomeThisMonth - totalIncomeLastMonth;
  const incomePercentChange = (incomeDifference / totalIncomeLastMonth) * 100;
  const expenseDifference = totalExpensesThisMonth - totalExpensesLastMonth;
  const expensePercentChange = (expenseDifference / totalExpensesLastMonth) * 100;

  let incomeInsight = '',
    expenseInsight = '';

  if (totalIncomeThisMonth === 0 || totalIncomeLastMonth === 0) {
    incomeInsight = 'No insights available right now.';
  } else {
    if (incomePercentChange >= 2.5) {
      incomeInsight = `Nice! Your income has increased by ${incomePercentChange.toFixed(2)}% compared to last month.`;
    } else if (incomePercentChange <= 2.5) {
      incomeInsight = `You've earned ${incomePercentChange.toFixed(2)}% less than last month.`;
    }
  }

  if (totalExpensesThisMonth === 0 || totalExpensesLastMonth === 0) {
    expenseInsight = 'No insights available right now.';
  } else {
    if (expensePercentChange >= 2.5) {
      expenseInsight = `Heads up! You've spent ${expensePercentChange.toFixed(2)}% more compared to last month.`;
    } else if (expensePercentChange <= 2.5) {
      expenseInsight = `So far so good! You've spent ${expensePercentChange.toFixed(2)}% less compared to last month.`;
    }
  }

  return {
    income: incomeInsight,
    expenses: expenseInsight,
  };
}
