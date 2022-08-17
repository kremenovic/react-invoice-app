import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { InvoiceProvider } from "./context/invoices_context";
import { FormProvider } from "./context/form_context";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <InvoiceProvider>
      <FormProvider>
        <App />
      </FormProvider>
    </InvoiceProvider>
  </React.StrictMode>
);
