import { useCartStore } from "../store/cartStore";

const Cart = () => {
  const carts = useCartStore((state) => state.carts);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotal = useCartStore((state) => state.getTotal);

  if (carts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white text-xl">
        Cart is empty
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f172a] to-[#020617] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {carts.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-6 mb-6 bg-slate-800 p-6 rounded-2xl shadow-lg"
          >
            <img
              src={item.images?.[0] || "/no-image.png"}
              alt={item.title}
              className="w-24 h-24 object-cover rounded-xl"
            />

            <div className="flex-1">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-400 mt-1">${item.price}</p>

              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                  className="bg-gray-700 px-3 py-1 rounded"
                >
                  -
                </button>

                <span className="text-lg">{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                  className="bg-gray-700 px-3 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl transition"
            >
              Remove
            </button>
          </div>
        ))}

        <div className="mt-10 bg-slate-900 p-6 rounded-2xl shadow-xl flex justify-between items-center">
          <span className="text-2xl font-semibold">
            Total:
          </span>
          <span className="text-2xl text-emerald-400 font-bold">
            ${getTotal().toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={clearCart}
            className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-xl transition"
          >
            Clear Cart
          </button>

          <button
            className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-xl transition"
          >
            Checkout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;