import { useState } from 'react';
import styled from 'styled-components';
import type { ExchangeRate } from '../types/currency';
import { convertCurrency } from '../services/cnbService';

const Card = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  label {
    display: block;
    font-weight: 600;
    color: #374151;
    margin-bottom: 6px;
    font-size: 14px;
  }

  input, select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 16px;
    margin-bottom: 16px;

    &:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
  }

  select {
    background: white;
    cursor: pointer;
  }
`;

const Result = styled.div`
  padding: 16px;
  background: #eff6ff;
  border-left: 4px solid #2563eb;
  border-radius: 6px;

  p:first-child {
    font-size: 18px;
    font-weight: 600;
    color: #1e40af;
    margin: 0;
  }

  p:last-child {
    font-size: 14px;
    color: #6b7280;
    margin: 8px 0 0 0;
  }
`;

interface CurrencyConverterProps {
  rates: ExchangeRate[];
}

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ rates }) => {
  const [amountCZK, setAmountCZK] = useState<string>('1000');
  const [selectedCurrency, setSelectedCurrency] = useState<string>(rates[0]?.code || '');

  const selectedRate = rates.find((r) => r.code === selectedCurrency);
  const converted = selectedRate && amountCZK
    ? convertCurrency(parseFloat(amountCZK) || 0, selectedRate)
    : 0;

  return (
    <Card>
      <h2>Currency Converter</h2>

      <label htmlFor="amount">Amount in CZK</label>
      <input
        id="amount"
        type="number"
        value={amountCZK}
        onChange={(e) => setAmountCZK(e.target.value)}
        placeholder="Enter amount in CZK"
        min="0"
        step="0.01"
      />

      <label htmlFor="currency">Target Currency</label>
      <select
        id="currency"
        value={selectedCurrency}
        onChange={(e) => setSelectedCurrency(e.target.value)}
      >
        {rates.map((rate) => (
          <option key={rate.code} value={rate.code}>
            {rate.code} - {rate.currency}
          </option>
        ))}
      </select>

      {selectedRate && amountCZK && (
        <Result>
          <p>
            {parseFloat(amountCZK).toLocaleString('cs-CZ')} CZK = {converted.toFixed(2)} {selectedRate.code}
          </p>
          <p>
            Rate: {selectedRate.amount} {selectedRate.code} = {selectedRate.rate.toFixed(3)} CZK
          </p>
        </Result>
      )}
    </Card>
  );
};
