import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


const SingleProduct = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);

        axios
            .get(`https://api.escuelajs.co/api/v1/products/${id}`)
            .then((res) => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white text-xl">
                Loading...
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-red-400 text-xl">
                Product Not Found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-[#0f172a] to-[#020617] flex items-center justify-center p-6 text-white">
            <div className="max-w-6xl w-full bg-[#0b1120] rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 gap-10 border border-white/10">

                <div className="flex items-center justify-center p-10 bg-[#0a0f1d]">
                    <img
                        src={product?.images?.[0]}
                        alt={product?.title}
                        className="w-full max-h-[500px] object-contain hover:scale-105 transition duration-500"
                    />
                </div>

                <div className="p-10 flex flex-col justify-center">
                    <span className="text-emerald-400 text-sm uppercase tracking-widest mb-3">
                        Premium Collection
                    </span>

                    <h1 className="text-4xl font-bold mb-6 leading-tight">
                        {product.title}
                    </h1>

                    <p className="text-gray-400 mb-8 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="text-3xl font-semibold text-emerald-400 mb-8">
                        ${Number(product.price).toFixed(2)}
                    </div>

                    <div className="flex gap-5">
                        <button className="bg-emerald-500 hover:bg-emerald-600 px-8 py-4 rounded-xl font-semibold transition duration-300 shadow-lg shadow-emerald-500/20 cursor-pointer">
                            Add to Cart
                        </button>

                        <button className="border border-white/20 hover:border-white/40 px-8 py-4 rounded-xl transition duration-300 cursor-pointer">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;