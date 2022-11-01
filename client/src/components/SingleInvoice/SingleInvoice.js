import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Moment from "react-moment";

import axios from "axios";

import { PDFDownloadLink } from "@react-pdf/renderer";

import { IoIosArrowBack } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import { GrDocumentPdf } from "react-icons/gr";

import { useMediaQuery } from "react-responsive";

import { useInvoiceContext } from "../../context/invoices_context";
import { useFormContext } from "../../context/form_context";

import { formatPrice } from "../../utils/helpers";
import DeleteInvoice from "../DeleteInvoice/DeleteInvoice";

import Loading from "../Loading/Loading";

import PdfPrint from "../PdfPrint/PdfPrint";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const SingleInvoice = () => {
  const { invoiceStatus, setInvoiceStatus, setStatus } = useInvoiceContext();

  const [invoiceData, setInvoiceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);

  const { updateInvoice, isEdit, setIsEdit } = useFormContext();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const URL = process.env.REACT_APP_API_URL;
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

    switch (res.data[0].status) {
      case "paid":
        setInvoiceStatus((invoiceStatus) => ({
          ...invoiceStatus,
          status: res.data[0].status,
          isTrue: false,
          isDraft: false,
        }));
        break;
      case "pending":
        setInvoiceStatus((invoiceStatus) => ({
          ...invoiceStatus,
          status: res.data[0].status,
          isTrue: true,
          isDraft: false,
        }));
        break;
      case "draft":
        setInvoiceStatus((invoiceStatus) => ({
          ...invoiceStatus,
          status: res.data[0].status,
          isTrue: false,
          isDraft: true,
        }));
        break;
    }
    setStatus([]);
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

  const updateStatus = (e) => {
    if (invoiceStatus.status === "pending") {
      axios.put(
        `${URL}invoices`,
        { data: { _id: e.target.dataset.id, status: "paid" } },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
    setInvoiceStatus((invoiceStatus) => ({
      ...invoiceStatus,
      status: "paid",
      isTrue: false,
    }));
  };

  const editInvoice = (e) => {
    updateInvoice(invoiceData, e);
  };

  useEffect(() => {
    fetchInvoiceData();
  }, [invoiceID, isEdit]);

  let {
    _id,
    id,
    billFromFields: billFrom,
    billToFields: billTo,
    issueDate: issue,
    paymentDue: due,
    projectDescription: description,
    total,
    itemListFields: items,
  } = invoiceData;

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div
        className={
          isEdit ? "container section single-invoice-page" : "container section"
        }
      >
        <div className="flex justify-content justify-between single-invoice-top">
          <Link to="/invoices" className="flex items-center">
            <IoIosArrowBack className="mr-2" /> Go Back
          </Link>
          <Link to="/invoices" className="flex items-center"></Link>
          {!invoiceStatus.isDraft && (
            <PDFDownloadLink
              document={
                <PdfPrint
                  id={id}
                  items={items}
                  billFrom={billFrom}
                  billTo={billTo}
                  issue={issue}
                  due={due}
                  description={description}
                  total={total}
                />
              }
              fileName={`invoice_${id}.pdf`}
            >
              {({ loading }) =>
                loading ? (
                  "Loading..."
                ) : (
                  <GrDocumentPdf className="mr-2 text-2xl " />
                )
              }
            </PDFDownloadLink>
          )}
        </div>
        <div className="invoice-top-info bg-white p-6 rounded-xl my-5 flex flex-col justify-between lg:flex lg:flex-row">
          <div className="invoice-status flex items-center justify-between lg:justify-start">
            Status
            <button
              className={`${invoiceStatus.status} px-5 py-2 rounded-md font-bold flex items-center ml-5`}
            >
              <FaCircle style={{ fontSize: "8px" }} />
              <p className="ml-2 text-xs">{`${invoiceStatus.status}`}</p>
            </button>
          </div>
          <div className="invoice-top-buttons flex items-center mt-5 justify-between lg:mt-0">
            <button
              className="lg:ml-5 ml-0 edit-invoice px-4 pl-3 py-2 rounded-3xl font-bold flex items-center cursor-pointer"
              data-id={_id}
              onClick={(e) => editInvoice(e)}
            >
              Edit
            </button>
            <button
              className="lg:ml-5 ml-0 delete-invoice px-4 py-2 rounded-3xl font-bold flex items-center cursor-pointer"
              onClick={() => setShowDelete(true)}
            >
              Delete
            </button>
            {invoiceStatus.isTrue && (
              <button
                className="lg:ml-5 ml-0 add-invoice px-4 pl-3 py-2 rounded-3xl font-bold flex items-center cursor-pointer"
                data-id={_id}
                onClick={(e) => updateStatus(e)}
              >
                Mark as Paid
              </button>
            )}
          </div>
        </div>
        <div className="invoice-bottom-info bg-white p-6 rounded-xl">
          <div className="flex  flex-col content-start lg:flex-row lg:justify-between">
            <div className="flex flex-col">
              <h2 className="font-bold text-base">
                <span className="p-color ">#</span>
                {id}
              </h2>
              <p className="p-color text-xs">{description}</p>
            </div>
            <div className="flex flex-col p-color text-left text-xs mt-5 lg:text-right lg:mt-0">
              <p>{billFrom[0].billFromStreetAddress}</p>
              <p>{billFrom[0].billFromCity}</p>
              <p>{billFrom[0].billFromPostCode}</p>
              <p>{billFrom[0].billFromCountry}</p>
            </div>
          </div>
          <div className="text-left my-8 w-full grid-cols-2 grid lg:w-11/12 lg:justify-between lg:flex">
            <div className="flex flex-col">
              <p className="p-color text-xs mb-3">Invoice Date</p>
              <h2 className="font-bold text-base">
                <Moment format="DD MMM YYYY">{issue}</Moment>
              </h2>
              <div className="flex flex-col mt-8">
                <p className="p-color text-xs mb-3 lg:mt-0">Payment Due</p>
                <h2 className="font-bold text-base">
                  <Moment format="DD MMM YYYY">{parseInt(due)}</Moment>
                </h2>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="p-color text-xs mb-3">Bill To</p>
              <h2 className="font-bold text-base">
                {billTo[0]?.billToClientName}
              </h2>
              <div className="address mt-2">
                <p className="p-color text-xs">
                  {billTo[0].billToStreetAddress}
                </p>
                <p className="p-color text-xs">{billTo[0]?.billToCity} </p>
                <p className="p-color text-xs">{billTo[0]?.billToCode}</p>
                <p className="p-color text-xs">{billTo[0].billToCountry}</p>
              </div>
            </div>
            <div className="flex flex-col mt-8 lg:mt-0">
              <p className="p-color text-xs mb-3">Sent To</p>
              <h2 className="font-bold text-base">
                {billTo[0].billToClientEmail}
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
            {!isMobile && (
              <div className="invoice-items-body ">
                {items?.map((item, index) => {
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
                        ${parseFloat(item.price).toFixed(2)}
                      </h1>
                      <h1 className="flex-initial w-32 text-right font-bold">
                        ${parseFloat(item.total).toFixed(2)}
                      </h1>
                    </div>
                  );
                })}
              </div>
            )}

            {isMobile && (
              <div className="invoice-items-body">
                {items?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="item flex justify-between my-5 last:my-0 items-center"
                    >
                      <div className="flex-initial w-64 font-bold ">
                        <h1>{item.itemName}</h1>
                        <p className="p-color text-sm">
                          {item.quantity} x ${parseFloat(item.price).toFixed(2)}
                        </p>
                      </div>
                      <h1 className="flex-initial w-32 text-right font-bold">
                        ${parseFloat(item.total).toFixed(2)}
                      </h1>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="invoice-total dark-bg rounded-b-lg p-6 flex justify-between items-center">
            <p className="text-white text-xs">Amount Due</p>
            <h3 className="text-white text-2xl font-bold">
              {formatPrice(total)}
            </h3>
          </div>
        </div>
      </div>
      {showDelete ? (
        <DeleteInvoice
          invoiceId={id}
          setShowDelete={setShowDelete}
          showDelete={showDelete}
          deleteInvoice={deleteInvoice}
          docId={_id}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default SingleInvoice;
