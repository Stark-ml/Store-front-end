import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import SidebarFilters from "./SidebarFilters";
import ProductCard from "./ProductCard";

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    categoryId: searchParams.get("category") || "",
    priceMin: 0,
    priceMax: 1000,
  });

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && categoryFromUrl !== filters.categoryId) {
      setFilters(prev => ({
        ...prev,
        categoryId: categoryFromUrl
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const params = {};
    if (filters.categoryId) params.categoryId = filters.categoryId;

    const minPrice = Number(filters.priceMin);
    const maxPrice = Number(filters.priceMax);

    if (!isNaN(minPrice) && minPrice > 0) {
      params.price_min = minPrice;
    }
    if (!isNaN(maxPrice) && maxPrice > 0) {
      params.price_max = maxPrice;
    }

    axios
      .get("https://api.escuelajs.co/api/v1/products", { params })
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden mb-4 px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className="flex gap-8">
          {/* Sidebar - Now responsive */}
          <aside className={`
            fixed lg:static inset-0 z-50 lg:z-auto
            ${showFilters ? 'block' : 'hidden'} lg:block
            w-full lg:w-64 p-6 lg:p-0
            bg-slate-50 lg:bg-transparent
          `}>
            {showFilters && (
              <div
                className="lg:hidden fixed inset-0 bg-black/50 -z-10"
                onClick={() => setShowFilters(false)}
              />
            )}

            <div className="relative">
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden absolute -top-2 right-0 text-gray-600 hover:text-gray-900 text-2xl"
              >
                ×
              </button>

              <SidebarFilters filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          <main className="flex-1">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Products</h1>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
                <p className="font-medium">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-80 bg-white rounded-2xl animate-pulse shadow-md"
                  />
                ))
                : products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;