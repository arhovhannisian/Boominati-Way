import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { notify } from "../../Components/UI/notify.jsx";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch existing users
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://boominati-way.onrender.com/users");
                setUsers(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            notify("All fields are required!", "red", 3000);
            return;
        }

        // Check if user exists
        const existingUser = users.find((user) => user.email === email);
        if (existingUser) {
            notify("User already exists!", "red", 3000);
            return;
        }

        // Register new user
        const newUser = { username, email, password };
        try {
            await axios.post("https://boominati-way.onrender.com/users", newUser);
            notify("Registration successful!", "green", 3000);
            navigate("/login"); // Redirect to login after successful registration
        } catch (err) {
            notify(`Registration error: ${err.message}`, "red", 3000);
            console.log(err);
        }

        setUsername("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Blobs background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-green-400 via-teal-400 to-yellow-400 rounded-full opacity-70 animate-blob blur-3xl top-[-50px] left-[-50px]"></div>
                <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-pink-400 via-red-400 to-purple-500 rounded-full opacity-70 animate-blob animation-delay-2000 blur-3xl top-[200px] right-[-100px]"></div>
                <div className="absolute w-[300px] h-[300px] bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full opacity-70 animate-blob animation-delay-4000 blur-2xl bottom-[-50px] left-[150px]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-sm z-10"
            >
                <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
                    Register
                </h2>

                <form className="space-y-4" onSubmit={handleRegister}>
                    <motion.div whileHover={{ scale: 1.02 }}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </motion.div>

                    <motion.div className="relative" whileHover={{ scale: 1.02 }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </motion.div>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                    >
                        Sign Up
                    </motion.button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-600 hover:underline">
                        Sign In
                    </Link>
                </p>
            </motion.div>

            <style>
                {`
          @keyframes blob {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob { animation: blob 8s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
        `}
            </style>
        </div>
    );
}
