function YearPicker({
  selectedYear,
  setSelectedYear,
}: {
  selectedYear: string;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col items-start gap-4">
      <label
        htmlFor="year"
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Select a tax year:
      </label>
      <select
        id="year"
        name="year"
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">--Please choose an option--</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
      </select>
    </div>
  );
}

export default YearPicker;
