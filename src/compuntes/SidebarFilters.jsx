const SidebarFilters = ({ filters, setFilters }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-gray-100">

      <h2 className="font-bold text-xl text-gray-800 border-b border-gray-200 pb-3">
        Filters
      </h2>

      <div className="z-50 relative">
        <label className="block font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">
          Category
        </label>
        <select
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
          value={filters.categoryId}
          onChange={(e) =>
            setFilters({ ...filters, categoryId: e.target.value })
          }
        >
          <option value="">All Categories</option>
          <option value="1">Clothes</option>
          <option value="2">Electronics</option>
          <option value="3">Furniture</option>
          <option value="4">Shoes</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">
          Price Range
        </label>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Min"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
            value={filters.priceMin}
            onChange={(e) =>
              setFilters({ ...filters, priceMin: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
            value={filters.priceMax}
            onChange={(e) =>
              setFilters({ ...filters, priceMax: e.target.value })
            }
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          ${filters.priceMin || 1} - ${filters.priceMax || 1000}
        </p>
      </div>
      <button
        type="button"
        onClick={() =>
          setFilters({ categoryId: "", priceMin: 1, priceMax: 1000 })
        }
        className="w-full bg-linear-to-r from-gray-100 to-gray-200 hover:from-emerald-500 hover:to-emerald-600 hover:text-white text-gray-700 rounded-xl py-3 font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
      >
        Reset Filters
      </button>

    </div>
  );
};

export default SidebarFilters;