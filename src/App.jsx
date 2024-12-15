// App.js
import React from "react";
import Home from "./component/Home";
import Join from "./component/Join";
import Account from "./component/Account";
import NotFound from "./component/NotFound";
import AddVehicle from "./component/AddVehicle";
import { Routes, Route, useParams } from "react-router-dom";
import ManageUsers from "./component/ManageUsers";
import VehicleList from "./component/VehicleList";
import ManageVehicles from "./component/ManageVehicles";
import AdminDashboard from "./component/AdminDashboard";
import ProviderDashboard from "./component/ProviderDashboard";
import ProtectedRoute from "./component/ProtectedRoute";
import ContactUs from "./component/ContactUs";
import HotelList from "./component/HotelList";
import ProviderVehiclesViewer from "./component/ProviderVehiclesViewer";

const ProviderVehiclesViewerWrapper = () => {
  const { providerId } = useParams();

  if (!providerId) {
    return <div>Error: Provider ID is missing in the URL.</div>;
  }

  return <ProviderVehiclesViewer providerId={providerId} />;
};


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join-us" element={<Join />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/vehicles" element={<VehicleList />} />
        <Route path="/vehicles/:providerId" element={<ProviderVehiclesViewerWrapper />} />
        <Route path="/hotels" element={<HotelList />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-vehicles"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageVehicles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        <Route path="/provider">
          <Route
            index
            element={
              <ProtectedRoute allowedRoles={["vehicle provider"]}>
                <ProviderDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="account" element={<Account />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="add-vehicle" element={<AddVehicle />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
