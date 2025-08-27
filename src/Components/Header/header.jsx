import React, {useEffect, useState} from 'react';
import Nav from "./nav.jsx";
import NavAdmin from "./navAdmin.jsx";
import axios from "axios";

const Header = () => {
    const token = localStorage.getItem('token')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [adm, setAdm] = useState({});
    const [pass, setPass] = useState('');
    const fetchAdmin = async () => {
        try{
            const response = await axios.get("http://localhost:4000/users")
            const data = await response.data;
            const admInfo =  data.find(u => u.username  === token)
            setAdm(admInfo);
        }catch (e){
            console.log(e.message)
        }
    }

    useEffect(() => {
        fetchAdmin()
    }, [token])

    return (
        <div className="Header">
        <div className="w-[95%] h-[50%] bg-amber-100 flex items-center rounded-2xl" >
            {token !== 'adminMode' ?  <Nav/> : <NavAdmin />}

            {
                token === 'admin' ?
                <button
                onClick={()=>{

                    setIsModalOpen(true)


                }}
                >Admin mode</button> :
                    token === 'adminMode' &&
                    <button
                        onClick={()=>{
                            localStorage.setItem('token', 'admin')
                            window.location.reload()
                        }}
                    >Exit Admin mode</button>
            }

            {isModalOpen &&
                <div className='absolute top-0 right-0 flex items-center justify-center w-full h-screen bg-black'>
                    <form className='relative p-4 bg-red-500 flex flex-col items-center justify-center gap-4 '>
                        Enter your password
                        <p
                            className='absolute top-2 right-4 cursor-pointer '
                            onClick={()=>{
                            setIsModalOpen(false)
                        }}>X</p>
                        <input
                            onChange={(e) => setPass(e.target.value)}
                            type="text"/>
                        <button
                            type='submit'
                            onClick={()=>{
                                if(pass === adm.password){
                                    localStorage.setItem('token', 'adminMode')
                                    window.location.reload()
                                }
                            }}
                        >
                            Submit
                        </button>
                    </form>
                </div>


               }
        </div>
        </div>
    );
};

export default Header;