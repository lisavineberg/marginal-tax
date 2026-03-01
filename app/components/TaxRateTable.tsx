import { type TaxRate } from "../page";
import { formatCurrency, calculateMarginalTax } from "../utils";

function TaxRateTable({
  taxRates,
  salary,
}: {
  taxRates: TaxRate[];
  salary: number;
}) {
  return (
    <table className="min-w-full divide-y divide-gray-200 mt-8">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Income Range
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Tax Rate
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Taxes paid
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Effective tax rate
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {taxRates.map((rate, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
              {formatCurrency(rate.min)}
              {rate.max ? ` - ${formatCurrency(rate.max)}` : "+"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {/* One of the rates doesn't multiply cleanly */}
              {(rate.rate * 100.0).toFixed(2)}%
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {calculateMarginalTax(salary, rate)}
            </td>
          </tr>
        ))}
        <tr>
          <td className="px-6 py-4 whitespace-nowrap font-bold">Total</td>
          <td className="px-6 py-4 whitespace-nowrap"></td>
          <td className="px-6 py-4 whitespace-nowrap font-bold">
            {formatCurrency(
              taxRates.reduce((total, rate) => {
                const tax = parseFloat(
                  calculateMarginalTax(salary, rate).replace(/[^0-9.-]+/g, ""),
                );
                return total + tax;
              }, 0),
            )}
          </td>
          <td className="px-6 py-4 whitespace-nowrap font-bold">
            {(
              (taxRates.reduce((total, rate) => {
                const tax = parseFloat(
                  calculateMarginalTax(salary, rate).replace(/[^0-9.-]+/g, ""),
                );
                return total + tax;
              }, 0) /
                salary) *
              100
            ).toFixed(2)}
            %
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default TaxRateTable;
