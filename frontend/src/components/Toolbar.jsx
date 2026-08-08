export default function Toolbar({ methods, activeMethod, onFilterChange, onNewBrew }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-3">
        <label htmlFor="method-filter" className="font-mono text-xs uppercase tracking-wider text-parchment-dim">
          Filter
        </label>
        <select
          id="method-filter"
          value={activeMethod}
          onChange={(e) => onFilterChange(e.target.value)}
          className="bg-roast-800 border border-roast-600 text-parchment font-body text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-crema/60 cursor-pointer"
        >
          <option value="">All methods</option>
          {methods.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={onNewBrew}
        className="inline-flex items-center gap-2 bg-crema text-roast-950 font-body font-semibold text-sm px-4 py-2 rounded-md hover:bg-crema-dim hover:text-parchment transition-colors focus:outline-none focus:ring-2 focus:ring-crema/60 focus:ring-offset-2 focus:ring-offset-roast-950"
      >
        <span className="text-lg leading-none">+</span> New brew
      </button>
    </div>
  );
}
