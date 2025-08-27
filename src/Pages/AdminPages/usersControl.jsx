import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { initialState, usersReducer } from "../../Reducer/usersReduces.jsx";

const UsersControl = () => {
    const [state, dispatch] = useReducer(usersReducer, initialState);
    const [editUserId, setEditUserId] = useState(null);
    const [editData, setEditData] = useState({ username: "", email: "", password: "" });

    // Fetch users
    const fetchUsers = async () => {
        dispatch({ type: "FETCH_USERS_REQUEST" });
        try {
            const res = await axios.get("http://localhost:4000/users");
            dispatch({ type: "FETCH_USERS_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "FETCH_USERS_FAILURE", payload: err.message });
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Delete user
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:4000/users/${id}`);
        dispatch({ type: "DELETE_USER", payload: id });
    };

    // Block user
    const handleBlock = async (id) => {
        await axios.patch(`http://localhost:4000/users/${id}`, { blocked: true });
        dispatch({ type: "BLOCK_USER", payload: id });
    };

    const handleUnBlock = async (id) => {
        await axios.patch(`http://localhost:4000/users/${id}`, { blocked: false });
        dispatch({ type: "UNBLOCK_USER", payload: id });
    };

    // Start edit
    const handleEdit = (user) => {
        setEditUserId(user.id);
        setEditData({ username: user.username, email: user.email, password: user.password });
    };

    // Save edit
    const handleSave = async (id) => {
        const updatedUser = { ...editData, id };
        await axios.patch(`http://localhost:4000/users/${id}`, updatedUser);
        dispatch({ type: "UPDATE_USER", payload: updatedUser });
        setEditUserId(null);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">👥 Users Control</h1>

            {state.loading && <p className="text-center text-blue-500">Loading...</p>}
            {state.error && <p className="text-center text-red-500">Error: {state.error}</p>}

            <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Username</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Password</th>
                    <th className="border p-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {state.users.map((user) => (
                    <tr key={user.id} className={user.blocked ? "bg-red-100" : ""}>
                        <td className="border p-2">{user.id}</td>

                        {/* եթե editing mode-ում ա user-ը → input fields */}
                        {editUserId === user.id ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editData.username}
                                        onChange={(e) =>
                                            setEditData({ ...editData, username: e.target.value })
                                        }
                                        className="border px-2 py-1 w-full"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="email"
                                        value={editData.email}
                                        onChange={(e) =>
                                            setEditData({ ...editData, email: e.target.value })
                                        }
                                        className="border px-2 py-1 w-full"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editData.password}
                                        onChange={(e) =>
                                            setEditData({ ...editData, password: e.target.value })
                                        }
                                        className="border px-2 py-1 w-full"
                                    />
                                </td>
                            </>
                        ) : (
                            <>
                                <td className="border p-2">{user.username}</td>
                                <td className="border p-2">{user.email}</td>
                                <td className="border p-2">{user.password}</td>
                            </>
                        )}

                        <td className="border p-2 flex gap-2">
                            {editUserId === user.id ? (
                                <button
                                    onClick={() => handleSave(user.id)}
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEdit(user)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                >
                                    Edit
                                </button>
                            )}
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Delete
                            </button>
                            {!user.blocked && (
                                <button
                                    onClick={() => handleBlock(user.id)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                >
                                    Block
                                </button>
                            )}

                            {user.blocked && (
                                <button
                                    onClick={() => handleUnBlock(user.id)}
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                >
                                    Unblock
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersControl;
