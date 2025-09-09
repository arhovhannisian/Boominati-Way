import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { notify } from "../../Components/UI/notify.jsx";
import { LOGIN_PAGE } from "../../Utils/routes.jsx";
import { usersReducer, initialState } from "../../Reducer/usersReduces.jsx";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [state, dispatch] = useReducer(usersReducer, initialState);
    const [registered, setRegistered] = useState(false);

    const navigate = useNavigate();

    const fetchUsers = async () => {
        dispatch({ type: 'FETCH_USERS_REQUEST' });
        try {
            const response = await axios.get("https://boominati-way.onrender.com/users");
            dispatch({ type: 'FETCH_USERS_SUCCESS', payload: response.data });
        } catch (err) {
            dispatch({ type: 'FETCH_USERS_FAILURE', payload: err.message });
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [registered]);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (email && password && username) {
            const newUser = { username, email, password };
            try {
                const response = await axios.post("https://boominati-way.onrender.com/users", newUser);
                setRegistered(!registered);
                notify('Registration success', "green", 3000);
                navigate(LOGIN_PAGE);
                console.log(response.data);
            } catch (err) {
                notify(`Registration error ${err.message}`, "red", 3000);
                console.log(err);
            }
            setUsername('');
            setEmail('');
            setPassword('');
        } else {
            notify('All fields are required!', 'red', 3000);
        }
    };

    return (
        <div className="relative w-full flex justify-center items-center h-[90vh]
                        bg-gradient-to-r from-green-300 via-white to-green-400
                        font-bold ">
            {
                state.loading ? <p>Loading...</p>
                    : state.error
            }
            <form
                onSubmit={handleRegister}
                className="w-[350px] min-h-[40vh] border border-black rounded-2xl
                           flex flex-col justify-center items-center gap-4 p-4 bg-white/50">
                <h1 className="text-xl">Register</h1>

                <input
                    className="p-1 rounded-2xl border w-full"
                    placeholder="Username"
                    value={username}
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className="p-1 rounded-2xl border w-full"
                    placeholder="Email"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="relative w-full">
                    <input
                        className="p-1 rounded-2xl border w-full"
                        placeholder="Password"
                        value={password}
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                    </span>
                </div>

                <button
                    className="w-full bg-green-700 text-white p-2 rounded-xl hover:bg-green-800 transition duration-300"
                    type="submit"
                >
                    Register
                </button>

                <Link to={LOGIN_PAGE} className="text-sm text-green-800 hover:underline mt-2">
                    Have an account? Login
                </Link>
            </form>
        </div>
    );
};

export default Register;
//
// import { useState } from "react";
// import axios from "axios";
// import { useLogReg } from "../../Context/LogRegContext.jsx";
//
// const Register = () => {
//     const { state, dispatch } = useLogReg();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//
//     const handleRegister = async (e) => {
//         e.preventDefault();
//         dispatch({ type: "REGISTER_START" });
//
//         try {
//             const res = await axios.post("/api/register", { email, password });
//             dispatch({ type: "REGISTER_SUCCESS", payload: res.data.user });
//         } catch (err) {
//             dispatch({ type: "REGISTER_ERROR", payload: err.response?.data?.message || "Error registering" });
//         }
//     };
//
//     return (
//         <form onSubmit={handleRegister}>
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             <button type="submit" disabled={state.loading}>
//                 {state.loading ? "Loading..." : "Register"}
//             </button>
//             {state.error && <p style={{ color: "red" }}>{state.error}</p>}
//         </form>
//     );
// };
//
// export default Register;
