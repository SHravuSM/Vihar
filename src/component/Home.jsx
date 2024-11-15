import React from 'react'
import LoginComponent from './LoginComponent';
import VehiclesList from './VehicleList';
import { auth } from '../firebaseConfig';
import Nav from './Nav';

export default function Home() {
    return (
        <div className="p-0 items-center h-screen flex flex-col gap-1">
            {!auth.currentUser?.displayName && <Nav />}
            <div className='h-full w-full'>

            </div>
            {/* <Nav /> */}
            {/* <h1 className='text-2xl font-semibold font-mono text-blue-600'>This is Home Page</h1> */}
            {/* <VehiclesList /> */}
            {/* <NavLink className=' border-2 border-blue-500 p-2 font-bold text-xl rounded-md ' to='/login'>Log In</NavLink> */}
            <LoginComponent />





        </div>
    )
}
