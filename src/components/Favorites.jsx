import { Link } from "react-router-dom";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { useCartStore } from "../store/useCartStore";

const placeholderImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";

const Favorites = () => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const removeFromFavorites = useFavoritesStore((state) => state.removeFromFavorites);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);
  const addToCart = useCartStore((state) => state.addToCart);

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white">
        <svg className="w-20 h-20 text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <h2 className="text-2xl font-bold mb-2">No Favorites Yet</h2>
        <p className="text-gray-400 mb-6">Start adding products you love!</p>
        <Link
          to="/products"
          className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-xl font-semibold transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f172a] to-[#020617] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            My Favorites
            <span className="text-emerald-400 text-lg font-normal ml-3">
              ({favorites.length} {favorites.length === 1 ? "item" : "items"})
            </span>
          </h1>
          <button
            onClick={clearFavorites}
            className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 px-5 py-2 rounded-xl text-sm font-medium transition cursor-pointer"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="bg-[#0b1120] rounded-2xl border border-white/10 overflow-hidden hover:border-emerald-500/40 transition-all duration-300 group"
            >
              <Link to={`/single-product/${product.id}`}>
                <div className="h-48 overflow-hidden bg-[#0a0f1d]">
                  <img
                    src={product.images?.[0] || placeholderImage}
                    alt={product.title}
                    onError={(e) => {
                      if (e.target.src !== placeholderImage) {
                        e.target.src = placeholderImage;
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </Link>

              <div className="p-5">
                <Link to={`/single-product/${product.id}`}>
                  <h3 className="font-semibold text-white truncate mb-2 group-hover:text-emerald-400 transition-colors">
                    {product.title}
                  </h3>
                </Link>

                <p className="text-emerald-400 text-lg font-bold mb-4">
                  ${Number(product.price || 0).toFixed(2)}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-xl text-sm font-semibold transition cursor-pointer"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromFavorites(product.id)}
                    className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 px-3 py-2 rounded-xl transition cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
