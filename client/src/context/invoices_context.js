import React, { useContext, useEffect, useState } from "react";

import axios from "axios";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const InvoiceContext = React.createContext();
export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);

  const URL = `http://localhost:8080/api/`;
  const token = cookies.get("TOKEN");

  const getInvoices = async () => {
    let res = await axios.get(`${URL}invoices`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let data = res.data;
    console.log(data);
    setInvoices(data);
  };

  useEffect(() => {
    getInvoices();
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
