import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { initialState, postsReducer } from "../../Reducer/postsReduces.jsx";

const Home = () => {
    const [state, dispatch] = useReducer(postsReducer, initialState);
    const [title, setTitle] = useState("");

    async function fetchPosts() {
        dispatch({ type: "FETCH_POSTS_REQUEST" });
        try {
            const response = await axios.get("http://localhost:4000/posts");
            dispatch({ type: "FETCH_POSTS_SUCCESS", payload: response.data });
        } catch (e) {
            dispatch({ type: "FETCH_POSTS_ERROR", payload: e.message });
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    async function addPost(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/posts", {
                title,
            });
            setTitle("");
            dispatch({ type: "ADD_POST", payload: response.data });
        } catch (e) {
            console.log(e.message);
        }
    }

    async function deletePost(id) {
        try {
            await axios.delete(`http://localhost:4000/posts/${id}`);
            dispatch({ type: "DELETE_POST", payload: id });
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div className="dark:bg-gray-900 dark:text-white w-full min-h-[80vh] py-10 px-4">

            <h1 className="text-3xl font-bold text-center mb-8">
                📝 Posts Manager
            </h1>


            <form
                onSubmit={addPost}
                className="flex justify-center gap-2 mb-8 max-w-md mx-auto"
            >
                <input
                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    value={title}
                    placeholder="Write new post..."
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
                >
                    Add
                </button>
            </form>


            <div className="max-w-2xl mx-auto">
                {state.loading && (
                    <p className="text-center text-lg text-gray-500">Loading...</p>
                )}

                {state.error && (
                    <p className="text-center text-red-500">{state.error}</p>
                )}

                {!state.loading && !state.error && state.posts.length === 0 && (
                    <p className="text-center text-gray-400">No posts yet 🚀</p>
                )}

                <ul className="space-y-3">
                    {state.posts.map((post) => (
                        <li
                            key={post.id}
                            className="flex justify-between items-center bg-white dark:bg-gray-800 shadow-md rounded-xl px-4 py-3"
                        >
                            <span className="font-medium">{`${post.id}: ${post.title}`}</span>
                            <button
                                onClick={() => deletePost(post.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                            >
                                ✖
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
