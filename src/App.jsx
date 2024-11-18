// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./component/AdminDashboard"; // Placeholder
import ProviderDashboard from "./component/ProviderDashboard"; // Placeholder
import PrivateRoute from "./component/PrivateRoute";
import Home from "./component/Home";
import AddVehicle from "./component/AddVehicle";
import ProviderVehicles from "./component/ProviderVehicles";
import Account from "./component/Account";
import VehicleList from "./component/VehicleList";
import Join from "./component/Join";
import NotFound from "./component/NotFound";
import VehicleDetail from "./component/VehicleDetail";
import ManageVehicles from "./component/ManageVehicles";
import ManageUsers from "./component/ManageUsers";
import AdminRoute from "./component/AdminRoute";

function App() {
  return (
    <div className="flex flex-col sm:gap-0">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join-us" element={<Join />} />
        <Route path="/vehicles" element={<VehicleList />} />
        <Route path="/vehicle/:id" element={<VehicleDetail />} />

        <Route
          path="/admin/*" // Add wildcard to catch all sub-routes
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/manage-vehicles"
          element={
            <AdminRoute>
              <ManageVehicles />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/manage-users"
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          }
        />


        <Route path="/provider">
          <Route index element={<ProviderDashboard />} />
          <Route path="add-vehicle" element={<AddVehicle />} />
          <Route path="account" element={<Account />} />
          <Route path="provider-vehicles" element={<ProviderVehicles />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
