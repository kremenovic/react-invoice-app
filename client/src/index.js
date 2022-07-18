import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./context/user_context";
import { InvoiceProvider } from "./context/invoices_context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <InvoiceProvider>
        <App />
      </InvoiceProvider>
    </UserProvider>
  </React.StrictMode>
);
