import axios from 'axios';
import { useState, useEffect } from 'react';

const placeholderProductImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";
const placeholderCategoryImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%239ca3af'%3ECategory%3C/text%3E%3C/svg%3E";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const selectedIds = [87, 86, 4, 5];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          axios.get("https://api.escuelajs.co/api/v1/categories"),
          axios.get("https://api.escuelajs.co/api/v1/products")
        ]);
        setCategories(categoriesRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="bg-gray-950 text-white">

      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Premium Tech Products <br />
            <span className="text-emerald-400">Built for Your Daily Life</span>
          </h1>

          <p className="text-gray-400 mt-6 max-w-lg">
            Discover the latest electronics, fashion, and lifestyle products
            crafted for quality and performance.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-emerald-500 hover:bg-emerald-600 transition px-6 py-3 rounded-xl font-medium cursor-pointer">
              Shop Now
            </button>
            <button className="border border-gray-700 hover:border-emerald-400 transition px-6 py-3 rounded-xl cursor-pointer">
              Browse Categories
            </button>
          </div>
        </div>

        <div className="h-[400px] bg-linear-to-br from-emerald-500/20 via-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-emerald-500/10 to-transparent" />
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold mb-12">
          Shop by Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories
            .filter(cat => selectedIds.includes(cat.id))
            .map(cat => (
              <div
                key={cat.id}
                className="bg-gray-900 rounded-2xl p-6 text-center"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  onError={(e) => {
                    if (e.target.src !== placeholderCategoryImage) {
                      e.target.src = placeholderCategoryImage;
                    }
                  }}
                  className="mx-auto h-24 w-24 object-contain mb-4"
                />
                <h3>{cat.name}</h3>
              </div>
            ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold mb-12">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="bg-gray-900 rounded-2xl p-6 hover:scale-[1.02] transition"
            >
              <img
                src={product.images?.[0] || placeholderProductImage}
                alt={product.title}
                onError={(e) => {
                  if (e.target.src !== placeholderProductImage) {
                    e.target.src = placeholderProductImage;
                  }
                }}
                className="h-48 w-full object-cover rounded-xl mb-4"
              />

              <h4 className="font-medium">{product.title}</h4>

              <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                {product.description}
              </p>

              <button className="mt-4 text-emerald-400 hover:underline cursor-pointer">
                View Product →
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          <div>
            <h4 className="text-xl font-semibold">Fast Delivery</h4>
            <p className="text-gray-400 mt-3">Quick and reliable shipping</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Premium Quality</h4>
            <p className="text-gray-400 mt-3">Only trusted brands</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Secure Payment</h4>
            <p className="text-gray-400 mt-3">100% safe checkout</p>
          </div>
        </div>
      </section>

      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold">
          Ready to upgrade your lifestyle?
        </h2>
        <p className="text-gray-400 mt-4">
          Explore thousands of premium products today.
        </p>
        <button className="cursor-pointer mt-8 bg-emerald-500 hover:bg-emerald-600 transition px-10 py-4 rounded-xl font-medium">
          Start Shopping
        </button>
      </section>

    </div>
  );
};

export default Home;