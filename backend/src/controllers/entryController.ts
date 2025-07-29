import { Request, Response } from 'express';
import { Entry } from '@entities/Entry';
import { Category } from '@entities/Category';
import dataSource from '@config/database';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { convertCurrency, findEntryById } from '@services/entryServices';

/*
This controller handles CRUD operations for entries.
creating an entry (income or expense),
reading/getting an entry (or all) of a user (using the userId from the JWT access token),
updating/editing an entry,
deleting an entry,
*/

interface DashboardMetrics {
  incomeThisMonth: number;
  expensesThisMonth: number;
  insights: {
    incomeDifference: number;
    expenseDifference: number;
    incomePercentChange: number;
    expensePercentChange: number;
    message: string;
  };
  topSpendingCategoryThisMonth: { category: string; amount: number } | null;
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
      res
        .status(400)
        .json({
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
      type,
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
          income: monthlyCashFlow[yearAndMonth].income,
          expense: monthlyCashFlow[yearAndMonth].expense,
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
      const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
      const lastDayOfYear = new Date(new Date().getFullYear() + 1, 0, 1);

      const entriesThisYear = await entryRepository.find({
        where: {
          user: { id: userId },
          timestamp: Between(firstDayOfYear, lastDayOfYear),
        },
        order: { timestamp: 'ASC' },
        relations: { category: true },
      });

      if (entriesThisYear.length === 0) {
        res.status(200).json({
          incomeThisMonth: 0,
          expensesThisMonth: 0,
          insights: {
            incomeDifference: 0,
            expenseDifference: 0,
            incomePercentChange: 0,
            expensePercentChange: 0,
            message: 'Try adding some entries.',
          },
          topSpendingCategoryThisMonth: null,
        } satisfies DashboardMetrics);
        return;
      }

      let incomeThisMonth: number = 0;
      let expenseThisMonth: number = 0;
      let incomesThisYear: { month: string; income: number }[] = [];
      let expensesThisYear: { month: string; expense: number }[] = [];
      const currentMonth = new Date().getMonth();
      let categoryExpenseRanking: { category: string; amount: number }[] = [];

      for (const entry of entriesThisYear) {
        // convert currency if doesn't match the given preferred currency
        if (entry.currency !== currency) {
          try {
            entry.amount = await convertCurrency(entry.amount, entry.currency, currency);
          } catch (error) {
            res.status(500).json({ error: `Error converting currency: ${error}` });
            return;
          }
        }

        // round the amount to 2 decimal places
        entry.amount = Math.round(entry.amount * 100) / 100;

        // extract month from timestamp
        const entryMonth = new Date(entry.timestamp).getMonth();

        if (entryMonth === currentMonth) {
          if (entry.type === 'income') {
            incomeThisMonth += entry.amount;
          } else if (entry.type === 'expense') {
            expenseThisMonth += entry.amount;

            // add to the category ranking for expenses
            const existingCategory = categoryExpenseRanking.find(
              (c) => c.category === entry.category.name,
            );
            if (existingCategory) {
              existingCategory.amount += entry.amount;
            } else {
              categoryExpenseRanking.push({ category: entry.category.name, amount: entry.amount });
            }
          }
        }

        // add to the yearly income and expense arrays
        const monthName = new Date(entry.timestamp).toLocaleString('en', { month: 'short' });

        if (entry.type === 'income') {
          // check if the month already exists in the incomesThisYear array
          const existingIncome = incomesThisYear.find((i) => i.month === monthName);
          if (existingIncome) {
            // if exists, add to the existing amount
            existingIncome.income += entry.amount;
          } else {
            // if not exists, push a new entry
            incomesThisYear.push({ month: monthName, income: entry.amount });
          }
        } else if (entry.type === 'expense') {
          // check if the month already exists in the expensesThisYear array
          const existingExpense = expensesThisYear.find((e) => e.month === monthName);
          if (existingExpense) {
            // if exists, add to the existing amount
            existingExpense.expense += entry.amount;
          } else {
            // if not exists, push a new entry
            expensesThisYear.push({ month: monthName, expense: entry.amount });
          }
        }
      }

      // get the top spending category for this month
      const topSpendingCategoryThisMonth =
        categoryExpenseRanking.sort((a, b) => b.amount - a.amount)[0] || null;

      res.status(200).json({
        incomeThisMonth: incomeThisMonth,
        expensesThisMonth: expenseThisMonth,
        insights: getPersonalizedMessageFromMonthComparison({
          thisMonthData: {
            month: new Date().toLocaleString('en', { month: 'long' }),
            income: incomeThisMonth,
            expense: expenseThisMonth,
          },
          lastMonthData: {
            // TODO: clean code, find last month data bc it is wrong
            income.find((i) => i.month === new Date().toLocaleString('en', { month: 'long' })) ||
          },
        }),
        topSpendingCategoryThisMonth: topSpendingCategoryThisMonth,
      } satisfies DashboardMetrics);
      return;
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

interface monthData {
  month: string;
  income: number;
  expense: number;
}

function getPersonalizedMessageFromMonthComparison({
  thisMonthData,
  lastMonthData,
}: {
  thisMonthData: monthData;
  lastMonthData: monthData;
}) {
  const incomeDifference = thisMonthData.income - lastMonthData.income;
  const expenseDifference = thisMonthData.expense - lastMonthData.expense;
  const incomePercentChange = (incomeDifference / lastMonthData.income) * 100;
  const expensePercentChange = (expenseDifference / lastMonthData.expense) * 100;

  let incomeInsight, expenseInsight;

  if (incomePercentChange >= 2.5) {
    incomeInsight = `Nice! Your income has increased by ${incomeDifference} (${incomePercentChange.toFixed(2)} increase) compared to last month.`;
  } else if (incomePercentChange <= 2.5) {
    incomeInsight = `You've earned ${Math.abs(incomeDifference)} (${incomePercentChange.toFixed(2)} decrease) less than last month.`;
  }

  if (expensePercentChange >= 2.5) {
    expenseInsight = `Heads up! You've spent ${expenseDifference} (${expensePercentChange.toFixed(2)} increase) compared to last month.`;
  } else if (expensePercentChange <= 2.5) {
    expenseInsight = `So far so good! You've spent ${Math.abs(expenseDifference)} (${incomeDifference} decrease) compared to last month.`;
  }

  return {
    incomeDifference,
    expenseDifference,
    incomePercentChange,
    expensePercentChange,
    insightMessages: [ incomeInsight, expenseInsight ]
  };
}
