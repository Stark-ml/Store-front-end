import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import SidebarFilters from "./SidebarFilters";
import ProductCard from "./ProductCard";
const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const titleFromUrl = searchParams.get("title") || "";
  const categoryFromUrl = searchParams.get("category") || "";

  const [filters, setFilters] = useState({
    categoryId: categoryFromUrl,
    priceMin: 1,
    priceMax: 1000,
  });

  useEffect(() => {
    setVisibleCount(12);
  }, [filters, titleFromUrl]);

  useEffect(() => {
    if (categoryFromUrl !== filters.categoryId) {
      setFilters((prev) => ({
        ...prev,
        categoryId: categoryFromUrl,
      }));
    }
  }, [categoryFromUrl]);

  useEffect(() => {
    const params = {};

    if (titleFromUrl) params.title = titleFromUrl;
    if (filters.categoryId) params.category = filters.categoryId;

    setSearchParams(params);
  }, [filters.categoryId]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const params = {};

    if (titleFromUrl) params.title = titleFromUrl;
    if (filters.categoryId) params.categoryId = filters.categoryId;

    const minPrice = Number(filters.priceMin);
    const maxPrice = Number(filters.priceMax);

    if (!isNaN(minPrice) && minPrice > 0) params.price_min = minPrice;
    if (!isNaN(maxPrice) && maxPrice > 0) params.price_max = maxPrice;

    axios.get("https://api.escuelajs.co/api/v1/products", { params })
      .then((res) => setProducts(res.data))
      .catch(() => setError("Failed to load products. Please try again."))
      .finally(() => setLoading(false));
  }, [filters, titleFromUrl]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden mb-6 px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        <div className="flex gap-8 relative">

          <aside
            className={`
              fixed inset-0 z-50 lg:static lg:inset-auto lg:z-auto
              ${showFilters ? "block" : "hidden"} lg:block
              w-full lg:w-64
              bg-slate-50 lg:bg-transparent
              p-6 lg:p-0
            `}
          >
            {showFilters && (
              <div
                className="lg:hidden fixed inset-0 bg-black/40 -z-10"
                onClick={() => setShowFilters(false)}
              />
            )}

            <div className="relative">
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden absolute top-0 right-0 text-2xl"
              >
                ×
              </button>

              <SidebarFilters filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          <main className="flex-1 relative z-10">
            <h1 className="text-2xl font-bold mb-2 text-gray-800">
              {titleFromUrl
                ? `Results for "${titleFromUrl}"`
                : "Products"}
            </h1>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
                {error}
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
                : products
                    .slice(0, visibleCount)
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                      />
                    ))}
            </div>

            {!loading && products.length > visibleCount && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="px-8 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-400 transition"
                >
                  Show more
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;








