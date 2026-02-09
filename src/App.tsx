import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { fetchExchangeRates } from './services/cnbService';
import { ExchangeRatesTable } from './components/ExchangeRatesTable';
import { CurrencyConverter } from './components/CurrencyConverter';
import { theme } from './theme';

const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1a1f3a 100%);
  padding: 40px 20px;

  h1 {
    font-size: 48px;
    font-weight: 800;
    color: #f1f5f9;
    margin: 0 0 8px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  h2 {
    font-size: 22px;
    font-weight: 700;
    color: #e2e8f0;
    margin: 0 0 16px;
  }

  > div {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

const StatusBox = styled.div<{ $error?: boolean }>`
  text-align: center;
  padding: 40px 20px;
  background: ${({ $error }) => ($error ? '#7f1d1d' : '#1e293b')};
  border-radius: 8px;
  border: ${({ $error }) => ($error ? '2px solid #dc2626' : 'none')};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  color: ${({ $error }) => ($error ? '#fca5a5' : '#94a3b8')};
  font-size: 18px;
`;

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['exchangeRates'],
    queryFn: fetchExchangeRates,
  });

  return (
    <Page>
      <div>
        <header style={{ textAlign: 'center' }}>
          <h1>CZK Currency Converter</h1>
          <p style={{ color: theme.text.tertiary, margin: 0, fontSize: 18 }}>
            Live exchange rates from Czech National Bank
          </p>
        </header>

        {isLoading && <StatusBox>Loading exchange rates…</StatusBox>}

        {error && (
          <StatusBox $error>
            Error loading exchange rates. Please try again later.
          </StatusBox>
        )}

        {data && (
          <>
            <p style={{ textAlign: 'center', color: theme.text.tertiary, margin: 0, opacity: 0.85, fontSize: 14 }}>
              Rates as of {data.date}
            </p>
            <CurrencyConverter rates={data.rates} />
            <ExchangeRatesTable rates={data.rates} />
          </>
        )}
      </div>
    </Page>
  );
}

export default App;
