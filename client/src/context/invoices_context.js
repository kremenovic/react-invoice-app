import React, { useContext, useEffect, useState } from "react";
import { useFormContext } from "../context/form_context";

import axios from "axios";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const InvoiceContext = React.createContext();
export const InvoiceProvider = ({ children }) => {
  const [allInvoices, setAllInvoices] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [status, setStatus] = useState([]);
  const [invoiceStatus, setInvoiceStatus] = useState({
    status: "",
    isTrue: null,
  });

  const { showForm } = useFormContext();

  const URL = process.env.REACT_APP_API_URL;
  const token = cookies.get("TOKEN");

  const getInvoices = async () => {
    let res = await axios.get(`${URL}invoices`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let data = res.data;
    setInvoices(data);
    setAllInvoices(data);
  };

  // FILTER INVOICES

  const filterInvoices = (e) => {
    if (e.target.checked) {
      setStatus([...status, e.target.name]);
    } else {
      setStatus(status.filter((item) => item !== e.target.name));
    }
  };

  useEffect(() => {
    if (status.length === 0) {
      if (token) {
        getInvoices();
      }
    } else {
      setInvoices(
        allInvoices.filter((invoice) =>
          status.some((statusName) =>
            [invoice.status].flat().includes(statusName)
          )
        )
      );
    }
  }, [status, showForm, invoiceStatus]);

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        filterInvoices,
        invoiceStatus,
        setInvoiceStatus,
        setStatus,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
export const useInvoiceContext = () => {
  return useContext(InvoiceContext);
};
