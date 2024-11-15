import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Shiv from '../images/Shiv.png';
import profile from '../images/Profile.png';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebaseConfig';
import Input from './Input';

export default function Nav({ white }) {
    const { user } = useAuth();
    const [yes, No] = useState()

    useEffect(() => {
        No(white)
    }, [white])

    return (
        <div className={`w-full lg:h-32 ${!yes ? "bg-white" : "bg-transparent"}  justify-around lg:rounded-lg md:h-24 sm:h-20 rounded-md flex items-center lg:p-2 md:p-2 `}>
            <div className='sm:w-[15%] sm:h-16 flex items-center justify-center '>
                <img className='lg:h-28 md:h-24 sm:h-14' src={Shiv} alt="" />
            </div>

            <div className='flex sm:w-[84%] sm:justify-evenly  lg:gap-80 items-center'>
                <Input />
                <div className={`flex lg:max-w-max sm:h-10 md:w-72 sm:justify-center lg:pr-8 lg:text-[18px] md:text-[10px] sm:text-[14px] font-semibold  ${!yes ? "text-black" : "text-white"} lg:gap-8 md:gap-5 sm:w-32 sm:gap-3   items-center lg:p-2`}>
                    <NavLink to="/">Home</NavLink>
                    {!auth?.currentUser && <NavLink to="/vehicles" className={({ isActive }) => isActive ? 'text-orange-500 cursor-pointer' : 'cursor-pointer'}>Vehicles</NavLink>}
                    {user && <NavLink to="/provider" className={({ isActive }) => isActive ? 'text-orange-500 cursor-pointer' : 'cursor-pointer'}>
                        <img className='lg:h-14 lg:w-14 sm:h-10' src={profile} alt="Profile" /></NavLink>}
                </div>
            </div>
        </div>
    );
}