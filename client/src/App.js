import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage, SingleInvoicePage, ErrorPage, InvoicesPage } from "./pages";

import Sidebar from "./components/Sidebar/Sidebar";

import "./App.css";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/invoices" element={<InvoicesPage />} />
        <Route exact path="/invoices/:id" element={<SingleInvoicePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
