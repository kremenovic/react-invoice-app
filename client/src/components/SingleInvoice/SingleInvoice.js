import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Moment from "react-moment";

import axios from "axios";

import { IoIosArrowBack } from "react-icons/io";
import { FaCircle } from "react-icons/fa";

import { useInvoiceContext } from "../../context/invoices_context";

import { formatPrice } from "../../utils/helpers";
import DeleteInvoice from "../DeleteInvoice/DeleteInvoice";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const SingleInvoice = () => {
  const { invoiceStatus, setInvoiceStatus } = useInvoiceContext();
  const [invoiceData, setInvoiceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);

  const URL = `http://localhost:8080/api/`;
  const token = cookies.get("TOKEN");

  const { id: invoiceID } = useParams();

  const fetchInvoiceData = async () => {
    let res = await axios.get(`${URL}invoices/${invoiceID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let data = res.data;
    setInvoiceData(data[0]);
    if (res.data[0].status === "draft") {
      setInvoiceStatus((invoiceStatus) => ({
        ...invoiceStatus,
        status: res.data[0].status,
        isTrue: false,
      }));
    }
    if (res.data[0].status === "paid") {
      setInvoiceStatus((invoiceStatus) => ({
        ...invoiceStatus,
        status: res.data[0].status,
        isTrue: true,
      }));
    }
    setLoading(false);
  };

  const deleteInvoice = (e) => {
    axios.delete(`${URL}invoices`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        _id: e.target.dataset.id,
      },
    });
    window.location.href = "/invoices";
  };

  const updateInvoice = (e) => {
    if (invoiceStatus.status === "draft") {
      axios.put(
        `http://localhost:8080/api/invoices`,
        { data: { _id: e.target.dataset.id, status: "paid" } },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else if (invoiceStatus.status === "paid") {
      axios.put(
        `http://localhost:8080/api/invoices`,
        { data: { _id: e.target.dataset.id, status: "draft" } },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
    setInvoiceStatus((invoiceStatus) => ({
      ...invoiceStatus,
      isTrue: !invoiceStatus.isTrue,
    }));
  };

  useEffect(() => {
    fetchInvoiceData();
  }, [invoiceID]);

  let {
    _id,
    id,
    billFromFields,
    billToFields,
    issueDate,
    paymentDue,
    projectDescription,
    total,
    itemListFields,
  } = invoiceData;

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="container section">
        <Link to="/invoices" className="flex items-center">
          <IoIosArrowBack className="mr-2" /> Go Back
        </Link>
        <div className="invoice-top-info bg-white p-6 rounded-xl my-5 flex flex-col justify-between lg:flex lg:flex-row">
          <div className="invoice-status flex items-center justify-between lg:justify-start">
            Status
            <button
              className={`${
                invoiceStatus.isTrue ? "paid" : "draft"
              } px-5 py-2 rounded-md font-bold flex items-center ml-5`}
            >
              <FaCircle style={{ fontSize: "8px" }} />
              <p className="ml-2 text-xs">{`${
                invoiceStatus.isTrue ? "Paid" : "Draft"
              }`}</p>
            </button>
          </div>
          <div className="invoice-top-buttons flex items-center mt-5 justify-between lg:mt-0">
            <button className="lg:ml-5 ml-0 edit-invoice px-4 pl-3 py-2 rounded-3xl font-bold flex items-center cursor-pointer">
              Edit
            </button>
            <button
              className="lg:ml-5 ml-0 delete-invoice px-4 py-2 rounded-3xl font-bold flex items-center cursor-pointer"
              onClick={() => setShowDelete(true)}
            >
              Delete
            </button>
            <button
              className="lg:ml-5 ml-0 add-invoice px-4 pl-3 py-2 rounded-3xl font-bold flex items-center cursor-pointer"
              data-id={_id}
              onClick={(e) => updateInvoice(e)}
            >
              {`Mark as ${invoiceStatus.isTrue ? "Draft" : "Paid"}`}
            </button>
          </div>
        </div>
        <div className="invoice-bottom-info bg-white p-6 rounded-xl">
          <div className="flex  flex-col content-start lg:flex-row lg:justify-between">
            <div className="flex flex-col">
              <h2 className="font-bold text-base">
                <span className="p-color ">#</span>
                {id}
              </h2>
              <p className="p-color text-xs">{projectDescription}</p>
            </div>
            <div className="flex flex-col p-color text-left text-xs mt-5 lg:text-right lg:mt-0">
              <p>{billFromFields[0].billFromStreetAddress}</p>
              <p>{billFromFields[0].billFromCity}</p>
              <p>{billFromFields[0].billFromPostCode}</p>
              <p>{billFromFields[0].billFromCountry}</p>
            </div>
          </div>
          <div className="text-left my-8 w-full grid-cols-2 grid lg:w-11/12 lg:justify-between lg:flex">
            <div className="flex flex-col">
              <p className="p-color text-xs mb-3">Invoice Date</p>
              <h2 className="font-bold text-base">
                <Moment format="DD MMM YYYY">{issueDate}</Moment>
              </h2>
              <div className="flex flex-col mt-8">
                <p className="p-color text-xs mb-3 lg:mt-0">Payment Due</p>
                <h2 className="font-bold text-base">
                  <Moment format="DD MMM YYYY">{parseInt(paymentDue)}</Moment>
                </h2>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="p-color text-xs mb-3">Bill To</p>
              <h2 className="font-bold text-base">
                {billToFields[0]?.billToClientName}
              </h2>
              <div className="address mt-2">
                <p className="p-color text-xs">
                  {billToFields[0].billToStreetAddress}
                </p>
                <p className="p-color text-xs">
                  {billToFields[0]?.billToCity}{" "}
                </p>
                <p className="p-color text-xs">{billToFields[0]?.billToCode}</p>
                <p className="p-color text-xs">
                  {billToFields[0].billToCountry}
                </p>
              </div>
            </div>
            <div className="flex flex-col mt-8 lg:mt-0">
              <p className="p-color text-xs mb-3">Sent To</p>
              <h2 className="font-bold text-base">
                {billToFields[0].billToClientEmail}
              </h2>
            </div>
          </div>
          <div className="invoice-items  bg-gray-200 rounded-t-lg p-6 ">
            <div className="invoice-items-head flex justify-between">
              <div className="flex-initial w-64">
                <p className="p-color text-xs">Item Name</p>
              </div>
              <div className="flex-initial w-32">
                <p className="p-color text-xs text-center">QTY.</p>
              </div>
              <div className="flex-initial w-32">
                <p className="p-color text-xs text-right">Price</p>
              </div>
              <div className="flex-initial w-32">
                <p className="p-color text-xs text-right">Total</p>
              </div>
            </div>
            <div className="invoice-items-body ">
              {itemListFields?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="item flex justify-between my-5 last:my-0"
                  >
                    <h1 className="flex-initial w-64 font-bold">
                      {item.itemName}
                    </h1>
                    <h1 className="flex-initial w-32 text-center font-bold p-color">
                      {item.quantity}
                    </h1>
                    <h1 className="flex-initial w-32 text-right font-bold p-color">
                      {item.price}
                    </h1>
                    <h1 className="flex-initial w-32 text-right font-bold">
                      {item.total}
                    </h1>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="invoice-total dark-bg rounded-b-lg p-6 flex justify-between items-center">
            <p className="text-white text-xs">Amount Due</p>
            <h3 className="text-white text-2xl font-bold">
              {formatPrice(total)}
            </h3>
          </div>
        </div>
      </div>
      <DeleteInvoice
        invoiceId={id}
        setShowDelete={setShowDelete}
        showDelete={showDelete}
        deleteInvoice={deleteInvoice}
        docId={_id}
      />
    </>
  );
};

export default SingleInvoice;
