import { Entry } from '@entities/Entry';
import dataSource from '@config/database';

export const findEntryById = async (id: string): Promise<Entry | null> => {
  try {
    return await dataSource.getRepository(Entry).findOneOrFail({
      where: { id },
      relations: {
        user: true,
        category: true,
      },
    });
  } catch (error) {
    console.error('Error fetching entry by ID:', error);
    return null;
  }
};

export const convertCurrency = async (
  amount: number,
  fromCurrency: string,
  toCurrency: string,
) => {
  // TODO: Implement caching for exchange rates to avoid frequent API calls
  try {

    // MOCK DATA
    const exchangeRates: Record<string, number> = {
      'EUR': 1,
      'RON': 5.07,
      'USD': 1.17,
      'GBP': 0.87,
    };

    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];


    // const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    // if (!response.ok) {
    //   throw new Error('Failed to fetch exchange rates');
    // }
    // const data = await response.json();
    // const rate = Number(data.rates[toCurrency]);
    // if (!rate) {
    //   throw new Error(`Currency ${toCurrency} not found`);
    // }

    // round to 2 decimal places
    return Math.round(amount * rate * 100) / 100;
  } catch (error) {
    console.error('Error converting currency:', error);
    throw error;
  }
};
