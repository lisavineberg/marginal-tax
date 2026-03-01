import { TaxRate } from "./page";

export function formatCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  });
  return formatter.format(amount);
}

export function calculateMarginalTax(salary: number, taxRate: TaxRate): number {
  console.log("Calculating tax for salary:", salary, "with tax rate:", taxRate);
  if (salary <= taxRate.min) {
    return 0;
  }

  const taxableIncome = taxRate.max
    ? Math.min(salary, taxRate.max) - taxRate.min
    : salary - taxRate.min;

  const tax = Math.round(taxableIncome * taxRate.rate * 10000) / 10000;
  return tax;
}
