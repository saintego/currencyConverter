import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CurrencyConverter } from './CurrencyConverter';
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

describe('CurrencyConverter', () => {
    it('should render the converter form', () => {
        render(<CurrencyConverter rates={mockRates} />);

        expect(screen.getByText('Currency Converter')).toBeInTheDocument();
        expect(screen.getByLabelText('Amount in CZK')).toBeInTheDocument();
        expect(screen.getByLabelText('Target Currency')).toBeInTheDocument();
    });

    it('should display converted amount', () => {
        render(<CurrencyConverter rates={mockRates} />);

        const input = screen.getByLabelText('Amount in CZK') as HTMLInputElement;
        expect(input.value).toBe('1000');

        expect(screen.getByText(/1 000 CZK =/)).toBeInTheDocument();
    });

    it('should update conversion when amount changes', async () => {
        const user = userEvent.setup();
        render(<CurrencyConverter rates={mockRates} />);

        const input = screen.getByLabelText('Amount in CZK') as HTMLInputElement;

        await user.clear(input);
        await user.type(input, '225');

        expect(input.value).toBe('225');
        expect(screen.getByText(/225 CZK =/)).toBeInTheDocument();
    });

    it('should show currency options in select', () => {
        render(<CurrencyConverter rates={mockRates} />);

        const select = screen.getByLabelText('Target Currency') as HTMLSelectElement;

        expect(select.children).toHaveLength(2);
        expect(screen.getByRole('option', { name: /USD - dollar/ })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: /EUR - euro/ })).toBeInTheDocument();
    });

    it('should update conversion when currency changes', async () => {
        const user = userEvent.setup();
        render(<CurrencyConverter rates={mockRates} />);

        const select = screen.getByLabelText('Target Currency') as HTMLSelectElement;

        await user.selectOptions(select, 'EUR');

        expect(select.value).toBe('EUR');
        // Should show EUR in result - check for specific conversion result
        expect(screen.getByText(/40.00 EUR/)).toBeInTheDocument();
    });
});
