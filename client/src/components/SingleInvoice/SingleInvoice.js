import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useInvoiceContext } from "../../context/invoices_context";

import { IoIosArrowBack } from "react-icons/io";
import { FaCircle } from "react-icons/fa";

const SingleInvoice = () => {
  const { invoices } = useInvoiceContext();

  const getID = useParams();
  const invoiceID = getID.id;

  return (
    <div className="container section">
      <Link to="/invoices" className="flex items-center">
        <IoIosArrowBack className="mr-2" /> Go Back
      </Link>
      <div className="invoice-top-info bg-white p-6 rounded-xl my-5 flex justify-between">
        <div className="invoice-status flex items-center">
          Status
          <button
            className={`pending px-5 py-2 rounded-md font-bold flex items-center ml-5`}
          >
            <FaCircle style={{ fontSize: "8px" }} />
            <p className="ml-2 text-xs">Pending</p>
          </button>
        </div>
        <div className="invoice-top-buttons flex items-center">
          <button className="ml-5 edit-invoice px-4 pl-3 py-2 rounded-3xl font-bold flex items-center cursor-pointer">
            Edit
          </button>
          <button className="ml-5 delete-invoice px-4 py-2 rounded-3xl font-bold flex items-center cursor-pointer">
            Delete
          </button>
          <button className="ml-5 add-invoice px-4 pl-3 py-2 rounded-3xl font-bold flex items-center cursor-pointer">
            Mark as Paid
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleInvoice;
