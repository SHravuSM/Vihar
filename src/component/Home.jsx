import React from 'react'
import { NavLink } from 'react-router-dom'
import LoginComponent from './LoginComponent';

export default function Home() {
    return (
        <div className='flex border-2 border-black rounded-md p-1 h-[100vh] flex-col items-center justify-center '>
            <h1 className='text-2xl font-semibold font-mono text-blue-600'>This is Home Page</h1>
            {/* <NavLink className=' border-2 border-blue-500 p-2 font-bold text-xl rounded-md ' to='/login'>Log In</NavLink> */}
            <LoginComponent />
        </div>
    )
}
