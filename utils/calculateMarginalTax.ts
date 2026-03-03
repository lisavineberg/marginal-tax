import { TaxRate } from "../app/page";

export function calculateMarginalTax(salary: number, taxRate: TaxRate): number {
  if (salary <= taxRate.min) {
    return 0;
  }

  const taxableIncome = taxRate.max
    ? Math.min(salary, taxRate.max) - taxRate.min
    : salary - taxRate.min;

  return taxableIncome * taxRate.rate;
}
