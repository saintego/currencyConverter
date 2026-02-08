import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExchangeRatesTable } from './ExchangeRatesTable';
import type { ExchangeRate } from '../types/currency';

const mockRates: ExchangeRate[] = [
    {
        country: 'USA',
        currency: 'dollar',
        amount: 1,
        code: 'USD',
        rate: 22.5,
    },
    {
        country: 'EMU',
        currency: 'euro',
        amount: 1,
        code: 'EUR',
        rate: 25.0,
    },
];

describe('ExchangeRatesTable', () => {
    it('should render the table with rates', () => {
        render(<ExchangeRatesTable rates={mockRates} />);

        expect(screen.getByText('Current Exchange Rates')).toBeInTheDocument();
        expect(screen.getByText('USA')).toBeInTheDocument();
        expect(screen.getByText('dollar')).toBeInTheDocument();
        expect(screen.getByText('USD')).toBeInTheDocument();
        expect(screen.getByText('EUR')).toBeInTheDocument();
    });

    it('should display rates with correct precision', () => {
        render(<ExchangeRatesTable rates={mockRates} />);

        expect(screen.getByText('22.500')).toBeInTheDocument();
        expect(screen.getByText('25.000')).toBeInTheDocument();
    });

    it('should render table headers', () => {
        render(<ExchangeRatesTable rates={mockRates} />);

        expect(screen.getByText('Country')).toBeInTheDocument();
        expect(screen.getByText('Currency')).toBeInTheDocument();
        expect(screen.getByText('Amount')).toBeInTheDocument();
        expect(screen.getByText('Code')).toBeInTheDocument();
        expect(screen.getByText('Rate (CZK)')).toBeInTheDocument();
    });
});
