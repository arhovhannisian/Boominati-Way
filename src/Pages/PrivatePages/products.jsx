import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { initialState, productsReducer } from "../../Reducer/productsReducer.jsx";

const Products = () => {
    const [state, dispatch] = useReducer(productsReducer, initialState);
    const [search, setSearch] = useState("");

    const fetchProducts = async () => {
        dispatch({ type: "FETCH_PRODUCTS_REQUEST" });
        try {
            const response = await axios.get("https://boominati-way.onrender.com/products");
            dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload: response.data });
        } catch (e) {
            dispatch({ type: "FETCH_PRODUCTS_FAILURE", payload: e.message });
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // filter search-ի համար
    const filteredProducts = state.products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">🛍 Products</h1>

            <div className="flex justify-center mb-6">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search products..."
                    className="border rounded-lg px-4 py-2 w-80 shadow focus:outline-none focus:ring focus:ring-blue-400"
                />
            </div>

            {state.loading && <p className="text-center text-blue-500">Loading...</p>}
            {state.error && (
                <p className="text-center text-red-500">Error: {state.error}</p>
            )}

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center hover:scale-105 transition-transform"
                    >
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={1}
                            navigation
                            modules={[Navigation]}
                            className="w-full h-48 rounded-lg overflow-hidden"
                        >
                            {product.images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={image}
                                        alt={product.name}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <h2 className="mt-4 font-semibold text-lg text-center">
                            {product.name}
                        </h2>
                        <span className="text-green-600 font-bold text-lg">
              ${product.price}
            </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Products;
