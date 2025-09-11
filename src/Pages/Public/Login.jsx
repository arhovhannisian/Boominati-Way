// Login.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { notify } from "../../Components/UI/notify.jsx";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin";

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("https://boominati-way.onrender.com/users");
                setUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();

        // Check token from localStorage
        const token = localStorage.getItem("token");
        if (token === adminEmail) setIsAdmin(true);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            notify("Fill all fields!", "red", 3000);
            return;
        }

        // Admin login override
        if (email === adminEmail && password === adminPassword) {
            localStorage.setItem("token", adminEmail);
            setIsAdmin(true);
            notify("Admin login successful!", "green", 3000);
            navigate("/admin"); // go to AdminPages
            return;
        }

        // Normal user login
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem("token", user.email);
            notify("Login successful!", "green", 3000);
            navigate("/"); // go to general page
        } else {
            notify("Invalid email or password", "red", 3000);
        }
    };

    const goToAdmin = () => {
        navigate("/admin");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            <form
                className="bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4 w-full max-w-sm"
                onSubmit={handleLogin}
            >
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                    type="submit"
                    className="py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
                >
                    Login
                </button>

                <p className="text-center text-gray-600 mt-2">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-purple-600 hover:underline">
                        Sign Up
                    </Link>
                </p>


                {isAdmin && (
                    <button
                        type="button"
                        onClick={goToAdmin}
                        className="mt-4 w-full py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                    >
                        Admin Mode
                    </button>
                )}
            </form>
        </div>
    );
}
