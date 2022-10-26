import React from "react";
import Moment from "react-moment";
import { useMediaQuery } from "react-responsive";

import { FaLongArrowAltRight, FaCircle } from "react-icons/fa";

import { formatPrice } from "../../utils/helpers";

const Invoices = ({ invoice }) => {
  const { id, paymentDue, billToFields, total, status } = invoice;
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="invoice flex justify-between items-center bg-white p-6 rounded-xl hover:translate-y-1 transition-all duration-300">
      <div className="invoice-left flex flex-wrap gap-3 flex-col md:gap-3 md:flex-row">
        <div className="invoice-id">
          <p className="font-bold text-xs">
            <span className="p-color">#</span>
            {id}
          </p>
        </div>
        <div className="invoice-date">
          <p className="p-color text-xs">
            Due <Moment format="DD MMM YYYY">{parseInt(paymentDue)}</Moment>
          </p>
        </div>
        <div className="invoice-name">
          <p className="p-color text-xs">{billToFields[0].billToClientName}</p>
        </div>
      </div>
      <div className="invoice-right flex flex-wrap gap-5 items-center flex-col md:gap-3 md:flex-row">
        <div className="invoice-amount">
          <p className="font-bold text-base">{formatPrice(total)}</p>
        </div>
        <div className="invoice-status">
          <button
            className={`${status} px-5 py-2 rounded-md font-bold flex items-center`}
          >
            <FaCircle style={{ fontSize: "8px" }} />
            <p className="ml-2 text-xs">{status}</p>
          </button>
        </div>
        {!isMobile ? (
          <div className="invoice-link">
            <p>
              <FaLongArrowAltRight />
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Invoices;
