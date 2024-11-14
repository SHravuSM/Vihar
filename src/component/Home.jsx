import React from 'react'
import LoginComponent from './LoginComponent';
import VehiclesList from './VehicleList';

export default function Home() {
    return (
        <div className='flex flex-col items-center justify-around  '>
            {/* <h1 className='text-2xl font-semibold font-mono text-blue-600'>This is Home Page</h1> */}
            <VehiclesList />
            {/* <NavLink className=' border-2 border-blue-500 p-2 font-bold text-xl rounded-md ' to='/login'>Log In</NavLink> */}
            <LoginComponent />





        </div>
    )
}
