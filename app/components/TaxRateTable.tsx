import { useMemo } from "react";
import { type TaxRate } from "../page";
import { calculateMarginalTax } from "../../utils/calculateMarginalTax";
import { formatCurrency } from "../../utils/formatCurrency";

function TaxRateTable({
  taxRates,
  salary,
}: {
  taxRates: TaxRate[];
  salary: number;
}) {
  const modifiedTaxRates = useMemo(() => {
    return taxRates.map((rate) => ({
      ...rate,
      tax: calculateMarginalTax(salary, rate),
    }));
  }, [taxRates, salary]);

  const totalTax = useMemo(() => {
    return modifiedTaxRates.reduce((total, rate) => total + rate.tax, 0);
  }, [modifiedTaxRates]);

  return (
    <table className="min-w-full divide-y divide-gray-200 overflow-x-auto block">
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
        {modifiedTaxRates.map((rate, index) => (
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
              {formatCurrency(rate.tax)}
            </td>
          </tr>
        ))}
        <tr>
          <td className="px-6 py-4 whitespace-nowrap font-bold">Total</td>
          <td className="px-6 py-4 whitespace-nowrap"></td>
          <td className="px-6 py-4 whitespace-nowrap font-bold">
            {formatCurrency(totalTax)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap font-bold">
            {((totalTax / salary) * 100).toFixed(2)}%
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default TaxRateTable;
