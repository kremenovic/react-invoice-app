import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  HomePage,
  SingleInvoicePage,
  ErrorPage,
  InvoicesPage,
  RegisterPage,
} from "./pages";

import Sidebar from "./components/Sidebar/Sidebar";
import InvoiceForm from "./components/InvoiceForm/InvoiceForm";

import { ProtectedRoute } from "./routes/ProtectedRoute";

import "./App.css";
import "react-calendar/dist/Calendar.css";

function App() {
  return (
    <Router>
      <Sidebar />
      <InvoiceForm />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route
          exact
          path="/invoices"
          element={
            <ProtectedRoute>
              <InvoicesPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/invoices/:id"
          element={
            <ProtectedRoute>
              <SingleInvoicePage />
            </ProtectedRoute>
          }
        />
        <Route exact path="/register" element={<RegisterPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
