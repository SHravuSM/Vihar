// App.js
import React from "react";
import Home from "./component/Home";
import Join from "./component/Join";
import Account from "./component/Account";
import NotFound from "./component/NotFound";
import AdminRoute from "./component/AdminRoute";
import AddVehicle from "./component/AddVehicle";
import { Routes, Route } from "react-router-dom";
import ManageUsers from "./component/ManageUsers";
import VehicleList from "./component/VehicleList";
import ManageVehicles from "./component/ManageVehicles";
import AdminDashboard from "./component/AdminDashboard";
import ProviderDashboard from "./component/ProviderDashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join-us" element={<Join />} />
        <Route path="/vehicles" element={<VehicleList />} />

        <Route path="/admin">
          <Route
            index
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
        </Route>

        <Route path="/provider">
          <Route index element={<ProviderDashboard />} />
          <Route path="account" element={<Account />} />
          <Route path="add-vehicle" element={<AddVehicle />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
