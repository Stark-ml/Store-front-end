import { useNavigate } from "react-router-dom";
const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const placeholderImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";

  const handleNavigate = () => {
    navigate(`/single-product/${product.id}`);
  };
  return (
    <div
      onClick={handleNavigate}
      className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-emerald-400 cursor-pointer"
    >
      <div className="h-56 overflow-hidden bg-gray-100">
        <img
          src={product?.images?.[0] || placeholderImage}
          alt={product?.title}
          onError={(e) => {
            if (e.target.src !== placeholderImage) {
              e.target.src = placeholderImage;
            }
          }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-gray-800 truncate mb-2 group-hover:text-emerald-600 transition-colors">
          {product?.title}
        </h3>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-emerald-600">
            ${Number(product?.price || 0).toFixed(2)}
          </p>

          <span className="text-sm px-4 py-2 bg-emerald-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition">
            View
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;