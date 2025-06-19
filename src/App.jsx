import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import NotificationCenter from "./components/notifications/NotificationCenter";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PropertyDetails from "./pages/PropertyDetails";
import Report from "./pages/Report";

export default function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/report/:id" element={<Report />} />
        </Routes>
      </Layout>
      <NotificationCenter />
    </>
  );
}