import React from 'react';
import {Link, Navigate} from "react-router-dom";
import {Private_Routes} from "../../Utils/routes.jsx";

const Nav = () => {
    function logout (){
        localStorage.clear()
        window.location.reload()
    }
    return (
            <ul className="flex justify-evenly gap-2 w-full">
                {Private_Routes.map((route, idx) => (
                    <li key={idx}>
                        <Link to={route.path}>{route.name}</Link>
                    </li>
                ))}
                <a href="/"> <button onClick={logout}>Log out</button></a>
            </ul>
    );
};
export default Nav;