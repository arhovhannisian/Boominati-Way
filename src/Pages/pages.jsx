import React from 'react';
import {useRoutes} from "react-router-dom";
import {Admin_Routes, Private_Routes, Public_Routes} from "../Utils/routes.jsx";

const Pages = () => {
    const token = localStorage.getItem("token");
    return (
        <div className={`w-full ${!token ? "min-h-[90vh]" : "min-h-[80vh] " }>`}>

            {
                 useRoutes(token && token !== 'adminMode' ? Private_Routes : token ==='adminMode' ? Admin_Routes :  Public_Routes)
            }

        </div>
    );
};

export default Pages;