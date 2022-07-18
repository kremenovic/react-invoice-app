import React from "react";
import noInvoicesImage from "../../assets/illustration-empty.svg";

const NoInvoices = () => {
  return (
    <>
      <img src={noInvoicesImage} alt="no invoices" className="w-60" />
      <h2 className="font-bold text-xl">There is nothing here</h2>
      <div className="empty-message p-color text-xs">
        <p>Create an invoice by clicking the </p>
        <p>
          <strong>New Invoice</strong> button and get started
        </p>
      </div>
    </>
  );
};

export default NoInvoices;
