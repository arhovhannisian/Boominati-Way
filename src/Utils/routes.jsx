import Register from "../Pages/Public/Register.jsx";
import Login from "../Pages/Public/Login.jsx";
import {Navigate} from "react-router-dom";
import Home from "../Pages/PrivatePages/home.jsx";
import About from "../Pages/PrivatePages/about.jsx";
import Contact from "../Pages/PrivatePages/contact.jsx";
import Todo from "../Pages/PrivatePages/todo.jsx";
import AddProduct from "../Pages/AdminPages/addProduct.jsx";
import Products from "../Pages/PrivatePages/products.jsx";
import Game from "../Pages/PrivatePages/game.jsx";
import PasswordInput from "../Pages/PrivatePages/game.jsx";
import Product from "../Pages/PrivatePages/product.jsx";
import AdminPage from "../Pages/AdminPages/adminPage.jsx";
import UsersControl from "../Pages/AdminPages/usersControl.jsx";

export const REGISTER_PAGE = "/register"
export const LOGIN_PAGE = "/login"
export const HOME_PAGE = "/"
export const ABOUT_PAGE = "/about"
export const CONTACT_PAGE = "/contact"
export const TODO_PAGE = "/todo"
export const GAME_PAGE = "/game"
export const PASSWORDINPUT = "/passwordinput"
export const ADDPRODUCT_PAGE = "/addproduct"
export const PRODUCT_PAGE = "/product"
export const PRODUCTS_PAGE = "/products"
export const ADMIN_PAGE = "/admin"
export const USERS_CONTROL_PAGE = "/userscontrol"


export const Admin_Routes=[
    {path:ADMIN_PAGE, element: <AdminPage /> ,name:"Admin"},
    {path:ADDPRODUCT_PAGE, element: <AddProduct />,name:"AddProduct"},
    {path:USERS_CONTROL_PAGE, element: <UsersControl />,name:"Users Control"},

    {path:"*", element: <Navigate to={ADMIN_PAGE}/>},
]

export const Public_Routes=[
    {path:REGISTER_PAGE, element: <Register /> ,name:"Register"},
    {path:LOGIN_PAGE, element: <Login/> ,name:"Login"},
    {path:"*", element: <Navigate to={REGISTER_PAGE}/>},
]
export const Private_Routes=[
    {path:HOME_PAGE, element: <Home /> ,name:"Home"},
    {path: ABOUT_PAGE, element: <About /> ,name:"About"},
    {path:CONTACT_PAGE, element: <Contact /> ,name:"Contact"},
    {path:TODO_PAGE, element: <Todo /> ,name:"Todo"},
    {path: GAME_PAGE, element: <Game /> ,name:"Game"},
    {path: PRODUCTS_PAGE,
        name: "Products",
        children: [
            {
            index: true,
            element: <Products />,
            },
            {
                path: ':id',
                element: <Product />,
            }
        ]
    },

    {path: PASSWORDINPUT, element: <PasswordInput /> ,name:"PasswordInput"},
    {path:"*", element: <Navigate to={HOME_PAGE}/>}
]