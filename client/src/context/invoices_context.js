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
    isTrue: false,
  });

  const { showForm } = useFormContext();

  const URL = `http://localhost:8080/api/`;
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
      getInvoices();
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
      value={{ invoices, filterInvoices, invoiceStatus, setInvoiceStatus }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
export const useInvoiceContext = () => {
  return useContext(InvoiceContext);
};
