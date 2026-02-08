import type { CNBData, ExchangeRate } from '../types/currency';

// Proxied via vite.config.ts (dev) and vercel.json (prod) to avoid CORS
const CNB_API_URL = '/api/cnb/daily.txt';

export const fetchExchangeRates = async (): Promise<CNBData> => {
  const response = await fetch(CNB_API_URL);

  if (!response.ok) {
    throw new Error(`CNB API error: ${response.status}`);
  }

  const text = await response.text();
  return parseCNBData(text);
};

export const parseCNBData = (data: string): CNBData => {
  const lines = data.split('\n').filter(line => line.trim() !== '');

  if (lines.length < 3) {
    throw new Error('Invalid CNB data: not enough lines');
  }

  const dateMatch = lines[0].match(/^\d{1,2}\s+\w{3}\s+\d{4}/);
  if (!dateMatch) {
    throw new Error('Invalid CNB data: could not parse date');
  }

  const rates: ExchangeRate[] = lines.slice(2).reduce<ExchangeRate[]>((acc, line) => {
    const parts = line.split('|');
    if (parts.length !== 5) return acc;

    const amount = parseFloat(parts[2]);
    const rate = parseFloat(parts[4]);
    if (isNaN(amount) || isNaN(rate) || amount <= 0 || rate <= 0) return acc;

    acc.push({
      country: parts[0].trim(),
      currency: parts[1].trim(),
      amount,
      code: parts[3].trim(),
      rate,
    });
    return acc;
  }, []);

  if (rates.length === 0) {
    throw new Error('Invalid CNB data: no valid rates found');
  }

  return { date: dateMatch[0], rates };
};

export const convertCurrency = (amountInCZK: number, rate: ExchangeRate): number => {
  return (amountInCZK * rate.amount) / rate.rate;
};
