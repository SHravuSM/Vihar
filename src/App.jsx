// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './component/AdminDashboard'; // Placeholder
import ProviderDashboard from './component/ProviderDashboard'; // Placeholder
import PrivateRoute from './component/PrivateRoute';
import Home from './component/Home';
import AddVehicle from './component/AddVehicle';
import ProviderVehicles from './component/ProviderVehicles';
import Account from './component/Account';
import Nav from './component/Nav';
import VehicleList from './component/VehicleList';
import { auth } from './firebaseConfig';

function App() {
  console.log(auth.currentUser?.displayName);

  return (
    <div className=" sm:gap-1 bg-[url('../src/images/Hampi7.png')] bg-cover bg-center h-screen flex flex-col">
      {/* {!auth.currentUser?.displayName && <Nav />} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles" element={<VehicleList />} />

        {/* Admin Route */}
        <Route path="/admin" element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </PrivateRoute>
        } />

        {/* Provider Routes */}
        {/* <Route path="/provider" element={<PrivateRoute allowedRoles={['vehicle provider']} />}> */}
        <Route path="/provider">
          <Route index element={<ProviderDashboard />} />
          <Route path="add-vehicle" element={<AddVehicle />} />
          <Route path="account" element={<Account />} />
          <Route path="provider-vehicles" element={<ProviderVehicles />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
