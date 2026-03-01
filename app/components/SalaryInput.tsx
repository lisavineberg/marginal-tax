import { TaxRate } from "../page";

function SalaryInput({
  setSalary,
  setTaxRates,
}: {
  setSalary: React.Dispatch<React.SetStateAction<number | null>>;
  setTaxRates: React.Dispatch<React.SetStateAction<TaxRate[] | null>>;
}) {
  return (
    <div>
      <label
        htmlFor="salary"
        className="block text-sm font-medium text-gray-700"
      >
        Salary
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="number"
          name="salary"
          id="salary"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder="0.00"
          onChange={(e) => {
            const value = Number(e.target.value);
            setSalary(value);
            setTaxRates(null);
          }}
        />
      </div>
    </div>
  );
}

export default SalaryInput;
