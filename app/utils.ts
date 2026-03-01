import { TaxRate } from "./page";

export function formatCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  });
  return formatter.format(amount);
}

export function calculateMarginalTax(salary: number, taxRate: TaxRate): string {
  if (salary <= taxRate.min) {
    return formatCurrency(0);
  }

  const taxableIncome = taxRate.max
    ? Math.min(salary, taxRate.max) - taxRate.min
    : salary - taxRate.min;

  const tax = Math.round(taxableIncome * taxRate.rate * 10000) / 10000;
  return formatCurrency(tax);
}
