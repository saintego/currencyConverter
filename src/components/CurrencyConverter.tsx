import { useState } from 'react';
import styled from 'styled-components';
import type { ExchangeRate } from '../types/currency';
import { convertCurrency } from '../services/cnbService';
import { theme } from '../theme';

const Card = styled.div`
  background: ${theme.bg.secondary};
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  label {
    display: block;
    font-weight: 600;
    color: ${theme.text.tertiary};
    margin-bottom: 6px;
    font-size: 14px;
  }

  input, select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid ${theme.border.primary};
    border-radius: 6px;
    font-size: 16px;
    margin-bottom: 16px;
    background: ${theme.bg.primary};
    color: ${theme.text.secondary};

    &:focus {
      outline: none;
      border-color: ${theme.accent};
      box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
    }

    &::placeholder {
      color: ${theme.text.muted};
    }
  }

  select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2360a5fa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 8px center;
    background-size: 20px;
    padding-right: 32px;
  }
`;

const Result = styled.div`
  padding: 16px;
  background: ${theme.bg.info};
  border-left: 4px solid ${theme.accent};
  border-radius: 6px;

  p:first-child {
    font-size: 18px;
    font-weight: 600;
    color: ${theme.accentLight};
    margin: 0;
  }

  p:last-child {
    font-size: 14px;
    color: ${theme.text.tertiary};
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
