import { type TaxRate } from "../page";

function TaxRateTable({ taxRates }: { taxRates: TaxRate[] }) {
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
            {" "}
            Tax Rate
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {taxRates.map((rate, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
              {rate.min} - {rate.max}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {(rate.rate * 100.0).toFixed(2)}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaxRateTable;
