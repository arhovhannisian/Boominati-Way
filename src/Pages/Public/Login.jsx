import React, {useEffect, useState} from 'react';
import axios from "axios";
import {notify} from "../../Components/UI/notify.jsx";


    const Login = () => {
        const [inputEmail, setinputEmail] = useState('');
        const [inputPassword, setinputLogPassword] = useState('');
        const [users, setUsers] = useState([])
        const [showPassword, setShowPassword] = useState(false);


        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://boominati-way.onrender.com//users')
                const data = await response.data;
                setUsers(data)
            } catch (err) {
                console.log(err)
            }
        }
        useEffect(() => {
            fetchUsers();
        }, [])

        const handleLogin = async (e) => {

            e.preventDefault();

            if (inputEmail === '' || inputPassword === '') {
                notify("Fill all fields", "red", 3000)
                return;

            }


            const user = users.find(
                (user) => user.email === inputEmail && user.password === inputPassword);

            if (user) {
                notify("Congratulation you're GAY", "green", 3000)
                localStorage.setItem("token", user.email)
                window.location.reload();
            } else {
                notify("Invalid email or password", "red", 3000)
            }

            setinputEmail('');
            setinputLogPassword('');
        };

        return (
            <div
                className="h-[90vh] flex justify-center items-center  bg-gradient-to-r from-blue-500 via-blue-100 to-blue-400  font-bold ">


                <form
                    onSubmit={handleLogin}
                    className="w-[300px] h-[400px] p-6 border-black rounded-2xl flex flex-col items-center justify-center shadow-xl gap-4">
                    <h1 className="text-2xl mb-2">Login</h1>
                    <input
                        className='w-full text-base border border-gray-400 p-3 rounded 2xl focus:outline-none focus:ring-2 focus:ring-green transition-all duration-300 placeholder:text-gray-500 '
                        type="text"
                        value={inputEmail}
                        onChange={(e) =>
                            setinputEmail(e.target.value)}
                        placeholder="Email"

                    />
                    <input
                        className='w-full text-base border border-gray-400 p-3 rounded 2xl focus:outline-none focus:ring-2 focus:ring-green transition-all duration-300 placeholder:text-gray-500'
                        placeholder="Password"
                        value={inputPassword}
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) =>
                            setinputLogPassword(e.target.value)
                        }
                    />
                    {inputPassword.length > 0 && (
                        <span


                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl"
                            onClick={() => setShowPassword(!showPassword)}
                        >

                </span>)

                    }
                    <button
                        className='p-1 rounded 2xl:'
                        type={"submit"}
                        // onClick={handleLogin}
                    >Login
                    </button>
                </form>
            </div>
        );

    }
export default Login;

// import { useState } from "react";
// import axios from "axios";
// import { useLogReg } from "../../Context/LogRegContext.jsx";
//
// const Login = () => {
//     const { state, dispatch } = useLogReg();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         dispatch({ type: "LOGIN_START" });
//
//         try {
//             const res = await axios.post("/api/login", { email, password });
//             dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
//         } catch (err) {
//             dispatch({ type: "LOGIN_ERROR", payload: err.response?.data?.message || "Error logging in" });
//         }
//     };
//
//     return (
//         <form onSubmit={handleLogin}>
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             <button type="submit" disabled={state.loading}>
//                 {state.loading ? "Loading..." : "Login"}
//             </button>
//             {state.error && <p style={{ color: "red" }}>{state.error}</p>}
//         </form>
//     );
// };
//
// export default Login;
