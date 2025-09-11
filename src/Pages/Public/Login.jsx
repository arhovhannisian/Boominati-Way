import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, checkToken } from '../../Redux/slices/authSlice.js';
import { notify } from '../../Components/UI/notify.jsx';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAdmin, currentUser, error } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(checkToken());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            notify(isAdmin ? 'Admin login successful!' : 'Login successful!', 'green', 3000);
            navigate(isAdmin ? '/admin' : '/');
        }
        if (error) {
            notify(error, 'red', 3000);
        }
    }, [currentUser, isAdmin, error, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            notify('Fill all fields!', 'red', 3000);
            return;
        }
        setLoading(true);
        await dispatch(login({ email, password }));
        setLoading(false);
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
                    disabled={loading}
                    className={`py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {loading ? 'Loading...' : 'Login'}
                </button>
                <p className="text-center text-gray-600 mt-2">
                    Don’t have an account?{' '}
                    <Link to="/register" className="text-purple-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
}