import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Shiv from '../images/Shiv.png';
import profile from '../images/Profile.png';
import Search from '../images/bike.png';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebaseConfig';

export default function Nav({white, pro}) {
    const { user } = useAuth();
    console.log(user);
    
    const [yes, No] = useState()

    useEffect(()=>{
        No(white)
    },[white])

    return (
        <div className={` w-full lg:h-32 ${yes ? "bg-white" : "bg-transparent"} lg:rounded-lg md:h-24 sm:h-20 rounded-md flex items-center lg:p-2 md:p-2 sm:p-1 `}>
            <div>
                <img className='lg:h-28 md:h-24 sm:h-16' src={Shiv} alt="" />
            </div>

            <div className='flex sm:gap-0  justify-evenly lg:gap-80 w-full items-center'>
                <div className='flex bg-none pr-[2px] lg:h-10 md:h-8 sm:h-10 md:w-64 sm:w-48 rounded-md lg:gap-2 md:gap-2 sm:gap-0 items-center'>
                    <input className='sm:w-full border bg-none bg-transparent sm:pl-2 border-blue-300 duration-1000 ease-in-out h-full lg:pl-2 md:pl-2 lg:text-xl md:text-xl sm:text-sm sm:placeholder:text-red-200 text-white placeholder:text-white lg:placeholder:text-lg md:placeholder:text-lg sm:placeholder:text-[14px] sm:rounded-md' type="text" placeholder='Search here' />
                    <img className='cursor-pointer acti sm:hidden rounded-sm lg:h-9 md:h-9 sm:h-4' src={Search} alt="" />
                </div>

                <div className={`flex lg:max-w-max md:w-72 sm:justify-around lg:pr-8 lg:text-[18px] md:text-[10px] sm:text-[14px] font-semibold  ${yes ? "text-black" : "text-white"} lg:gap-8 md:gap-5 sm:gap-5 items-center p-2`}>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'text-blue-500 cursor-pointer' : 'cursor-pointer'}>Home</NavLink>
                    {!auth?.currentUser && <NavLink to="/vehicles" className={({ isActive }) => isActive ? 'text-orange-500 cursor-pointer' : 'cursor-pointer'}>Vehicles</NavLink> }
                    {user && <NavLink to="/provider" className={({ isActive }) => isActive ? 'text-orange-500 cursor-pointer' : 'cursor-pointer'}>
                        <img className='lg:h-14 lg:w-14 sm:h-10' src={profile} alt="Profile" /></NavLink>}
                </div>
            </div>
        </div>
    );
}
