import React, { useContext, useEffect, useState } from "react";
import data from "../assets/data.json";

const InvoiceContext = React.createContext();
export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    setInvoices(data);
  }, []);

  return (
    <InvoiceContext.Provider value={{ invoices }}>
      {children}
    </InvoiceContext.Provider>
  );
};
export const useInvoiceContext = () => {
  return useContext(InvoiceContext);
};
