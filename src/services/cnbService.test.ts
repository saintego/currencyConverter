import { describe, it, expect } from "vitest";
import { convertCurrency, parseCNBData } from "./cnbService";
import type { ExchangeRate } from "../types/currency";

const SAMPLE_CNB_DATA = `07 Feb 2026 #27
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|14.652
Japan|yen|100|JPY|15.012
USA|dollar|1|USD|22.512`;

describe("parseCNBData", () => {
  it("should parse valid CNB data", () => {
    const result = parseCNBData(SAMPLE_CNB_DATA);
    expect(result.date).toBe("07 Feb 2026");
    expect(result.rates).toHaveLength(3);
    expect(result.rates[0]).toEqual({
      country: "Australia",
      currency: "dollar",
      amount: 1,
      code: "AUD",
      rate: 14.652,
    });
  });

  it("should handle amount > 1 (e.g. JPY)", () => {
    const result = parseCNBData(SAMPLE_CNB_DATA);
    const jpy = result.rates.find((r) => r.code === "JPY");
    expect(jpy?.amount).toBe(100);
  });

  it("should skip malformed lines gracefully", () => {
    const data = `07 Feb 2026 #27
Country|Currency|Amount|Code|Rate
USA|dollar|1|USD|22.512
bad line here
EMU|euro|1|EUR|25.145`;

    const result = parseCNBData(data);
    expect(result.rates).toHaveLength(2);
  });

  it("should throw on empty data", () => {
    expect(() => parseCNBData("")).toThrow();
  });

  it("should throw on data with no valid rates", () => {
    const data = `07 Feb 2026 #27
Country|Currency|Amount|Code|Rate
bad|data|only`;
    expect(() => parseCNBData(data)).toThrow();
  });
});

describe("convertCurrency", () => {
  const usd: ExchangeRate = {
    country: "USA",
    currency: "dollar",
    amount: 1,
    code: "USD",
    rate: 22.5,
  };
  const jpy: ExchangeRate = {
    country: "Japan",
    currency: "yen",
    amount: 100,
    code: "JPY",
    rate: 15.0,
  };

  it("should convert CZK to USD", () => {
    expect(convertCurrency(225, usd)).toBe(10);
  });

  it("should handle amount > 1 currencies (JPY)", () => {
    expect(convertCurrency(150, jpy)).toBe(1000);
  });

  it("should return 0 for zero input", () => {
    expect(convertCurrency(0, usd)).toBe(0);
  });

  it("should handle decimals", () => {
    expect(convertCurrency(112.5, usd)).toBe(5);
  });
});
