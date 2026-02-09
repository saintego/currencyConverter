import styled from 'styled-components';
import type { ExchangeRate } from '../types/currency';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #1e293b;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  th {
    background: #0f172a;
    color: #cbd5e1;
    padding: 12px;
    text-align: left;
    font-weight: 600;
    font-size: 14px;
    border-bottom: 2px solid #334155;
  }

  td {
    padding: 12px;
    border-bottom: 1px solid #334155;
    font-size: 14px;
    color: #cbd5e1;
  }

  tbody tr:hover {
    background: #334155;
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
