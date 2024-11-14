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

function App() {
  return (
    <>
      <div className='p-1'>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<LoginComponent />} /> */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/provider">
            <Route index element={
              <PrivateRoute allowedRoles={['vehicle_provider']}>
                <ProviderDashboard />
              </PrivateRoute>
            } />
            <Route path="add-vehicle" element={<AddVehicle />} />
            <Route path="add-vehicle" element={<AddVehicle />} />
            <Route path="account" element={<Account />} />
            <Route path="provider-vehicles" element={<ProviderVehicles />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
