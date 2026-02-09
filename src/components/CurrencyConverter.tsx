import { useState } from 'react';
import styled from 'styled-components';
import type { ExchangeRate } from '../types/currency';
import { convertCurrency } from '../services/cnbService';

const Card = styled.div`
  background: #1e293b;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  label {
    display: block;
    font-weight: 600;
    color: #cbd5e1;
    margin-bottom: 6px;
    font-size: 14px;
  }

  input, select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #334155;
    border-radius: 6px;
    font-size: 16px;
    margin-bottom: 16px;
    background: #0f172a;
    color: #e2e8f0;

    &:focus {
      outline: none;
      border-color: #60a5fa;
      box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
    }

    &::placeholder {
      color: #64748b;
    }
  }

  select {
    cursor: pointer;
  }
`;

const Result = styled.div`
  padding: 16px;
  background: #1e3a8a;
  border-left: 4px solid #60a5fa;
  border-radius: 6px;

  p:first-child {
    font-size: 18px;
    font-weight: 600;
    color: #93c5fd;
    margin: 0;
  }

  p:last-child {
    font-size: 14px;
    color: #cbd5e1;
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
        <>
            <h2>Currency Converter</h2>
            <Card>
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
        </>
    );
};
