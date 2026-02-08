import styled from 'styled-components';
import type { ExchangeRate } from '../types/currency';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  th {
    background: #2563eb;
    color: white;
    padding: 12px;
    text-align: left;
    font-weight: 600;
    font-size: 14px;
  }

  td {
    padding: 12px;
    border-bottom: 1px solid #e5e7eb;
    font-size: 14px;
  }

  tbody tr:hover {
    background: #f9fafb;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

interface ExchangeRatesTableProps {
    rates: ExchangeRate[];
}

export const ExchangeRatesTable: React.FC<ExchangeRatesTableProps> = ({ rates }) => (
    <div>
        <h2>Current Exchange Rates</h2>
        <Table>
            <thead>
                <tr>
                    <th>Country</th>
                    <th>Currency</th>
                    <th>Amount</th>
                    <th>Code</th>
                    <th>Rate (CZK)</th>
                </tr>
            </thead>
            <tbody>
                {rates.map((rate) => (
                    <tr key={rate.code}>
                        <td>{rate.country}</td>
                        <td>{rate.currency}</td>
                        <td>{rate.amount}</td>
                        <td><strong>{rate.code}</strong></td>
                        <td>{rate.rate.toFixed(3)}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
);
