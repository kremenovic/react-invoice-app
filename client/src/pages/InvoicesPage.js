import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { useInvoiceContext } from "../context/invoices_context";
import { useFormContext } from "../context/form_context";

import Filters from "../components/Filters/Filters";
import Invoices from "../components/Invoices/Invoices";
import NoInvoices from "../components/NoInvoices/NoInvoices";

import { FaPlusCircle } from "react-icons/fa";

const InvoicesPage = () => {
  const { invoices } = useInvoiceContext();
  const { newInvoice, showForm } = useFormContext();

  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div
      className={
        showForm ? "container section invoice-page" : "container section"
      }
    >
      <div className="content-top flex justify-between items-center">
        <div className="content-top-left">
          <h1 className="text-3xl font-bold md:text-xl">Invoices</h1>
          <p className="p-color text-xs ">
            {!isMobile
              ? `There are ${invoices ? invoices.length : "0"} total invoices`
              : `${invoices ? invoices.length : "0"} invoices`}
          </p>
        </div>
        <div className="content-top-right flex justify-between items-center relative">
          <Filters />
          <button
            className="ml-5 add-invoice pr-5 pl-3 py-2 rounded-3xl font-bold flex items-center"
            onClick={() => newInvoice()}
          >
            <FaPlusCircle className="mr-3 text-3xl md:text-xl" />{" "}
            {!isMobile ? "New Invoices" : "New"}
          </button>
        </div>
      </div>
      {invoices.length !== 0 ? (
        <section className="invoices-content mt-12 flex flex-col gap-5">
          {invoices.map((invoice, index) => {
            return (
              <Link key={index} to={`/invoices/${invoice.id}`}>
                <Invoices invoice={invoice} />
              </Link>
            );
          })}
        </section>
      ) : (
        <section className="invoices-content mt-20 flex flex-col gap-5 text-center items-center">
          <NoInvoices />
        </section>
      )}
    </div>
  );
};

export default InvoicesPage;
