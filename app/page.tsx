"use client"; // This is a client component because it uses useState and fetches data from an API
import { useState } from "react";

import SalaryInput from "./components/SalaryInput";
import YearPicker from "./components/YearPicker";
import TaxRateTable from "./components/TaxRateTable";

export type TaxRate = {
  max?: number;
  min: number;
  rate: number;
};

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [taxRates, setTaxRates] = useState<TaxRate[] | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [salary, setSalary] = useState<number | null>(null);

  const handleFormSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const year = selectedYear;

    if (!salary || !year) {
      setError("Please fill in all fields.");
      return;
    }

    if (salary < 0) {
      setError("Salary must be a positive number.");
      return;
    }

    setLoading(true);

    fetch(`http://localhost:5001/tax-calculator/tax-year/${year}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          setError("Error fetching tax rates. Please try again.");
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTaxRates(data.tax_brackets);
      })
      .catch(() => {
        setError("Error calculating tax. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-start bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-4 px-16 bg-white sm:items-start">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
          Welcome to Lisa&apos;s marginal tax calculator.
        </h1>
        <form
          className="w-full flex flex-col gap-y-4"
          onSubmit={handleFormSubmit}
        >
          <SalaryInput
            setSalary={setSalary}
            setTaxRates={setTaxRates}
          ></SalaryInput>
          <YearPicker
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          ></YearPicker>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
          >
            {loading ? "Calculating..." : "Calculate"}
          </button>
          {taxRates && salary !== null && (
            <TaxRateTable taxRates={taxRates} salary={salary}></TaxRateTable>
          )}
        </form>
      </main>
    </div>
  );
}
