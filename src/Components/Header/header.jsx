import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Nav from './nav.jsx';
import NavAdmin from './navAdmin.jsx';
import axios from 'axios';

const Header = () => {
    const navigate = useNavigate();
    const { isAdmin } = useSelector((state) => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pass, setPass] = useState('');
    const [error, setError] = useState(null);

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://boominati-way.onrender.com/admin-login', { password: pass });
            if (response.data.success) {
                localStorage.setItem('token', 'adminMode');
                navigate('/admin');
                setIsModalOpen(false);
            } else {
                setError('Invalid password');
            }
        } catch (e) {
            setError(e.message);
        }
    };

    const handleExitAdmin = () => {
        localStorage.setItem('token', 'admin');
        navigate('/');
    };

    return (
        <div className="Header">
            <div className="w-[95%] h-[50%] bg-amber-100 flex items-center rounded-2xl">
                {isAdmin ? <NavAdmin /> : <Nav />}
                {localStorage.getItem('token') === 'admin' && (
                    <button onClick={() => setIsModalOpen(true)}>Admin mode</button>
                )}
                {isAdmin && (
                    <button onClick={handleExitAdmin}>Exit Admin mode</button>
                )}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <form
                            onSubmit={handleAdminLogin}
                            className="relative p-4 bg-white rounded-xl flex flex-col gap-4"
                        >
                            <p className="text-center">Enter your admin password</p>
                            {error && <p className="text-red-500">{error}</p>}
                            <p
                                className="absolute top-2 right-4 cursor-pointer"
                                onClick={() => setIsModalOpen(false)}
                            >
                                X
                            </p>
                            <input
                                type="password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                className="p-2 border rounded"
                            />
                            <button type="submit" className="p-2 bg-purple-600 text-white rounded">
                                Submit
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;