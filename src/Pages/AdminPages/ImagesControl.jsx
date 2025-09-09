// Pages/Admin/ImagesControl.jsx
import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { imagesReducer, initialImageState } from "../../Reducer/imagesReducer.jsx";
import { Link } from "react-router-dom";

const ImagesControl = () => {
    const [state, dispatch] = useReducer(imagesReducer, initialImageState);

    const fetchImages = async () => {
        dispatch({ type: "FETCH_IMAGES_REQUEST" });
        try {
            const res = await axios.get("https://boominati-way.onrender.com/products");
            dispatch({ type: "FETCH_IMAGES_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "FETCH_IMAGES_FAILURE", payload: err.message });
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`https://boominati-way.onrender.com/${id}`);
        dispatch({ type: "DELETE_IMAGE", payload: id });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">🖼 Images Control</h1>

            {state.loading && <p className="text-center text-blue-500">Loading...</p>}
            {state.error && <p className="text-center text-red-500">Error: {state.error}</p>}

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {state.images.map((img) => (
                    <div
                        key={img.id}
                        className="border rounded-lg shadow p-4 flex flex-col items-center bg-white"
                    >
                        <img
                            src={img.url}
                            alt={img.name}
                            className="w-40 h-40 object-cover rounded mb-3"
                        />
                        <h2 className="font-bold">{img.name}</h2>
                        <p className="text-gray-600">${img.price}</p>
                        <p className="text-sm text-gray-500">{img.description}</p>

                        <div className="flex gap-2 mt-3">
                            <Link
                                to={`/editimage/${img.id}`}
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(img.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImagesControl;
