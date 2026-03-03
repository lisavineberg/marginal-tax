import { calculateMarginalTax } from "../utils/calculateMarginalTax";

const MOCK_TAX_RATES = [
  {
    max: 50197,
    min: 0,
    rate: 0.15,
  },
  {
    max: 100392,
    min: 50197,
    rate: 0.205,
  },
  {
    max: 155625,
    min: 100392,
    rate: 0.26,
  },
  {
    max: 221708,
    min: 155625,
    rate: 0.29,
  },
  {
    min: 221708,
    rate: 0.33,
  },
];

describe("calculateMarginalTax", () => {
  it("calculates tax for a salary within the lowest bracket", () => {
    const salary = 50000;
    const tax = MOCK_TAX_RATES.reduce(
      (totalTax, rate) => totalTax + calculateMarginalTax(salary, rate),
      0,
    ).toFixed(2);
    expect(tax).toBe("7500.00");
  });

  it("calculates tax for a salary that spans multiple brackets", () => {
    const salary = 100000;
    const tax = MOCK_TAX_RATES.reduce(
      (totalTax, rate) => totalTax + calculateMarginalTax(salary, rate),
      0,
    ).toFixed(2);
    expect(tax).toBe("17739.17");
  });

  it("calculates tax for income with no upper limit", () => {
    const salary = 1234567;
    const tax = MOCK_TAX_RATES.reduce(
      (totalTax, rate) => totalTax + calculateMarginalTax(salary, rate),
      0,
    ).toFixed(2);
    expect(tax).toBe("385587.65");
  });
});
