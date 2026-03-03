export function formatCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  });
  return formatter.format(amount);
}
