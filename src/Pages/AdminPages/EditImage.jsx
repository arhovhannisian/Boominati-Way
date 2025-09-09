// Pages/Admin/EditImage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditImage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        url: "",
    });

    useEffect(() => {
        const fetchImage = async () => {
            const res = await axios.get(`https://boominati-way.onrender.com/${id}`);
            setFormData(res.data);
        };
        fetchImage();
    }, [id]);

    const handleSave = async () => {
        await axios.patch(`https://boominati-way.onrender.com/${id}`, formData);
        navigate("/images"); // հետո redirect է անում обратно images control
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">✏ Edit Image</h1>

            <div className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border px-3 py-2 rounded"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="border px-3 py-2 rounded"
                />
                <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    className="border px-3 py-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="border px-3 py-2 rounded"
                />

                <img
                    src={formData.url}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded self-center"
                />

                <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default EditImage;
