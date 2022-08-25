import moment from "moment";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useFormContext } from "../../context/form_context";

import { FaCalendarAlt, FaTrashAlt } from "react-icons/fa";

import { useForm } from "react-hook-form";

const InvoiceForm = () => {
  const {
    billToFields,
    billFromFields,
    addFields,
    itemListFields,
    handleItemFieldsChange,
    handleFromTextChange,
    handleToTextChange,
    removeItemField,
    handleSaveSend,
    selectRef,
    handleChangeDate,
    showCalendar,
    handleShowCalendar,
    issueDate,
    handlePaymentDue,
    paymentDue,
    handlePaymentTermsChange,
    paymentTerms,
    projectDescription,
    handleProjectDescription,
    handleSaveDraft,
    showForm,
    handleDiscard,
  } = useFormContext();

  const [itemListNumber, setItemListNumber] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (e) => {
    const buttonType = window.event.submitter.name;

    if (buttonType === "save") {
      if (itemListFields.length === 0) {
        setItemListNumber(true);
      }
      if (itemListFields.length > 1) {
        setItemListNumber(false);

        handleSaveSend(e);
      }
    }

    if (buttonType === "draft") {
      if (itemListFields.length === 0) {
        setItemListNumber(true);
      } else if (itemListFields.length > 1) {
        setItemListNumber(false);

        handleSaveDraft(e);
      }
    }
  };

  useEffect(() => {
    handlePaymentDue();
    handlePaymentTermsChange();
  }, [issueDate, paymentTerms]);

  return (
    <>
      <div
        className={`overlay max-w-full opacity-70 fixed top-0 bottom-0 left-0 right-0 z-40 h-screen w-full bg-black ${
          showForm ? "show" : ""
        }`}
      ></div>
      <div
        className={`container pt-10 form max-w-3xl z-50 absolute bg-white h-screen overflow-auto lg:fixed ${
          showForm ? "show" : ""
        }`}
      >
        <div className="inner-section bg-white ">
          <h3 className="font-bold text-2xl px-10">New Invoice</h3>
          <form
            className="mt-5 w-full px-10"
            onSubmit={handleSubmit((e) => handleFormSubmit(e))}
          >
            {/* Bill To */}
            <p className="text-sm font-bold text-purple-500">Bill To</p>
            {/* 1 col */}
            <div className="w-full flex flex-col mt-5">
              <label htmlFor="billToStreetAddress" className="p-color">
                Street Address
              </label>
              <input
                type="text"
                id="billToStreetAddress"
                name="billToStreetAddress"
                className={`border h-12 mt-2 px-3 focus:outline-none focus:border-purple-500 rounded-lg ${
                  errors.billToStreetAddress ? "border-red-500" : ""
                }`}
                value={billToFields[0].billToStreetAddress}
                {...register("billToStreetAddress", {
                  required: "This field cannot be empty",
                  onChange: (e) => handleToTextChange(e),
                })}
              />
              <div className="text-red-500">
                {errors ? errors.billToStreetAddress?.message : ""}
              </div>
            </div>
            {/* 3 col */}
            <div className="w-full flex justify-between flex-col mt-5 mb-10 lg:flex-row">
              <div className="w-1/4">
                <label htmlFor="billToCity" className="p-color">
                  City
                </label>
                <input
                  type="text"
                  id="billToCity"
                  name="billToCity"
                  className={`border h-12 mt-2 px-3 w-full focus:outline-none focus:border-purple-500 rounded-lg ${
                    errors.billToCity ? "border-red-500" : ""
                  }`}
                  value={billToFields[0].billToCity}
                  {...register("billToCity", {
                    required: "This field cannot be empty",
                    onChange: (e) => handleToTextChange(e),
                  })}
                />
                <div className="text-red-500">
                  {errors ? errors.billToCity?.message : ""}
                </div>
              </div>
              <div className="w-1/4">
                <label htmlFor="billToPostCode" className="p-color">
                  Post Code
                </label>
                <input
                  type="text"
                  id="billToPostCode"
                  name="billToPostCode"
                  className={`border h-12 mt-2 px-3 w-full focus:outline-none focus:border-purple-500 rounded-lg ${
                    errors.billToPostCode ? "border-red-500" : ""
                  }`}
                  value={billToFields[0].billToPostCode}
                  {...register("billToPostCode", {
                    required: "This field cannot be empty",
                    onChange: (e) => handleToTextChange(e),
                  })}
                />
                <div className="text-red-500">
                  {errors ? errors.billToPostCode?.message : ""}
                </div>
              </div>
              <div className="w-1/4">
                <label htmlFor="billToCountry" className="p-color">
                  Country
                </label>
                <input
                  type="text"
                  id="billToCountry"
                  name="billToCountry"
                  className={`border h-12 mt-2 px-3 w-full focus:outline-none focus:border-purple-500 rounded-lg ${
                    errors.billToCountry ? "border-red-500" : ""
                  }`}
                  value={billToFields[0].billToCountry}
                  {...register("billToCountry", {
                    required: "This field cannot be empty",
                    onChange: (e) => handleToTextChange(e),
                  })}
                />
                <div className="text-red-500">
                  {errors ? errors.billToCountry?.message : ""}
                </div>
              </div>
            </div>
            {/* Bill From */}
            <p className="text-sm font-bold text-purple-500">Bill From</p>
            {/* 1 col */}
            <div className="w-full flex flex-col mt-5">
              <label htmlFor="billFromClientName" className="p-color">
                Client's Name
              </label>
              <input
                type="text"
                id="billFromClientName"
                name="billFromClientName"
                className={`border h-12 mt-2 px-3 focus:outline-none focus:border-purple-500 rounded-lg ${
                  errors.billFromClientName ? "border-red-500" : ""
                }`}
                value={billFromFields[0].billFromClientName}
                {...register("billFromClientName", {
                  required: "This field cannot be empty",
                  onChange: (e) => handleFromTextChange(e),
                })}
              />
              <div className="text-red-500">
                {errors ? errors.billFromClientName?.message : ""}
              </div>
            </div>
            {/* 1 col */}
            <div className="w-full flex flex-col mt-5">
              <label htmlFor="billFromClientEmail" className="p-color">
                Client's Email
              </label>
              <input
                type="email"
                id="billFromClientEmail"
                name="billFromClientEmail"
                className={`border h-12 mt-2 px-3 focus:outline-none focus:border-purple-500 rounded-lg ${
                  errors.billFromClientEmail ? "border-red-500" : ""
                }`}
                value={billFromFields[0].billFromClientEmail}
                {...register("billFromClientEmail", {
                  required: "This field cannot be empty",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email",
                  },
                  onChange: (e) => handleFromTextChange(e),
                })}
              />
              <div className="text-red-500">
                {errors ? errors.billFromClientEmail?.message : ""}
              </div>
            </div>
            {/* 1 col */}
            <div className="w-full flex flex-col mt-5">
              <label htmlFor="billFromStreetAddress" className="p-color">
                Street Address
              </label>
              <input
                type="text"
                id="billFromStreetAddress"
                name="billFromStreetAddress"
                className={`border h-12 mt-2 px-3 focus:outline-none focus:border-purple-500 rounded-lg ${
                  errors.billFromStreetAddress ? "border-red-500" : ""
                }`}
                value={billFromFields[0].billFromStreetAddress}
                {...register("billFromStreetAddress", {
                  required: "This field cannot be empty",
                  onChange: (e) => handleFromTextChange(e),
                })}
              />
              <div className="text-red-500">
                {errors ? errors.billFromStreetAddress?.message : ""}
              </div>
            </div>
            {/* 3 col */}
            <div className="w-full flex flex-col justify-between mt-5 mb-10 lg:flex-row">
              <div className="w-1/4">
                <label htmlFor="billFromCity" className="p-color">
                  City
                </label>
                <input
                  type="text"
                  id="billFromCity"
                  name="billFromCity"
                  className={`border h-12 mt-2 w-full px-3 focus:outline-none focus:border-purple-500 rounded-lg ${
                    errors.billFromCity ? "border-red-500" : ""
                  }`}
                  value={billFromFields[0].billFromCity}
                  {...register("billFromCity", {
                    required: "This field cannot be empty",
                    onChange: (e) => handleFromTextChange(e),
                  })}
                />
                <div className="text-red-500">
                  {errors ? errors.billFromCity?.message : ""}
                </div>
              </div>
              <div className="w-1/4">
                <label htmlFor="billFromPostCode" className="p-color">
                  Post Code
                </label>
                <input
                  type="text"
                  id="billbillFromCode"
                  name="billbillFromCode"
                  className={`border h-12 mt-2 w-full px-3 focus:outline-none focus:border-purple-500 rounded-lg ${
                    errors.billbillFromCode ? "border-red-500" : ""
                  }`}
                  value={billFromFields[0].billbillFromCode}
                  {...register("billbillFromCode", {
                    required: "This field cannot be empty",
                    onChange: (e) => handleFromTextChange(e),
                  })}
                />
                <div className="text-red-500">
                  {errors ? errors.billbillFromCode?.message : ""}
                </div>
              </div>
              <div className="w-1/4">
                <label htmlFor="billFromCountry" className="p-color">
                  Country
                </label>
                <input
                  type="text"
                  id="billFromCountry"
                  name="billFromCountry"
                  className={`border h-12 mt-2 w-full px-3 focus:outline-none focus:border-purple-500 rounded-lg ${
                    errors.billFromCountry ? "border-red-500" : ""
                  }`}
                  value={billFromFields[0].billFromCountry}
                  {...register("billFromCountry", {
                    required: "This field cannot be empty",
                    onChange: (e) => handleFromTextChange(e),
                  })}
                />
                <div className="text-red-500">
                  {errors ? errors.billFromCountry?.message : ""}
                </div>
              </div>
            </div>
            {/* 3 col */}
            <div className="w-full flex flex-col justify-between mt-5 mb-10 lg:flex-row">
              <div className="w-1/4">
                <label htmlFor="issueDate" className="p-color">
                  Issue Date
                </label>
                <div
                  className="relative cursor-pointer"
                  onClick={handleShowCalendar}
                >
                  <input
                    type="text"
                    id="issueDate"
                    className="border cursor-pointer relative h-12 mt-2 w-full p-color px-3 focus:outline-none focus:border-purple-500 rounded-lg"
                    value={moment(issueDate).format("DD MMM YYYY")}
                    disabled
                  />
                  <FaCalendarAlt className="absolute center-icon p-color text-sm" />
                </div>

                <div
                  className={`flex absolute bg-white mb-5 flex-col ${
                    showCalendar ? "flex" : "hidden"
                  }`}
                >
                  <div className="my-5">
                    <Calendar onChange={handleChangeDate} value={issueDate} />
                  </div>
                </div>
              </div>
              <div className="w-1/4">
                <label htmlFor="paymentTerms" className="p-color">
                  Payyment Terms
                </label>
                <select
                  name="paymentTerms"
                  id="paymentTerms"
                  className="border cursor-pointer h-12 mt-2 w-full px-3 focus:outline-none focus:border-purple-500 rounded-lg"
                  ref={selectRef}
                  onChange={handlePaymentTermsChange}
                >
                  <option value="1">Net 1 Day</option>
                  <option value="7">Net 7 Days</option>
                  <option value="14">Net 14 Days</option>
                  <option value="30">Net 30 Days</option>
                </select>
              </div>
              <div className="w-1/4">
                <label htmlFor="paymentDue" className="p-color">
                  Payment Due
                </label>

                <input
                  type="text"
                  id="paymentDue"
                  className="border p-color h-12 mt-2 w-full px-3 focus:outline-none focus:border-purple-500 rounded-lg"
                  disabled
                  value={moment(paymentDue).format("DD MMM YYYY")}
                />
              </div>
            </div>
            {/* 1 col */}
            <div className="w-full flex flex-col mt-5 mb-8">
              <label htmlFor="projectDescription" className="p-color">
                Project Description
              </label>
              <input
                type="text"
                id="projectDescription"
                name="projectDescription"
                value={projectDescription}
                className={`border h-12 mt-2 px-3 focus:outline-none focus:border-purple-500 rounded-lg ${
                  errors.projectDescription ? "border-red-500" : ""
                }`}
                {...register("projectDescription", {
                  required: "This field cannot be empty",
                  onChange: (e) => handleProjectDescription(e),
                })}
              />
              <div className="text-red-500">
                {errors ? errors.projectDescription?.message : ""}
              </div>
            </div>
            {/* add item felds */}
            {/* 5 col */}
            <h3 className="font-bold text-xl  p-color">Item List</h3>
            <div className="text-red-500">
              {errors ? errors.itemName?.message : ""}
              <br></br>
              {errors ? errors.quantity?.message : ""}
              <br></br>
              {errors ? errors.price?.message : ""}
            </div>
            {itemListFields.map((input, index) => {
              return (
                <div
                  className="w-full flex flex-col justify-between mt-5 mb-10 lg:flex-row"
                  key={index}
                >
                  <div className="w-64">
                    <label className="p-color">Item Name</label>
                    <input
                      type="text"
                      className={`border h-12 mt-2 w-full px-3 focus:outline-none focus:border-purple-500 rounded-lg ${
                        errors.itemName ? "border-red-500" : ""
                      }`}
                      name="itemName"
                      value={input.itemName}
                      // onChange={(e) => handleItemFieldsChange(index, e)}
                      {...register("itemName", {
                        required: "* Item name cannot be empty",
                        onChange: (e) => handleItemFieldsChange(index, e),
                      })}
                    />
                  </div>
                  <div className="w-14">
                    <label className="p-color">Qty.</label>
                    <input
                      type="number"
                      className={`border h-12 mt-2 w-full px-3 focus:outline-none focus:border-purple-500 rounded-lg ${
                        errors.quantity ? "border-red-500" : ""
                      }`}
                      name="quantity"
                      value={input.quantity}
                      {...register("quantity", {
                        required: "This field cannot be empty",
                        pattern: {
                          value: /^[1-999999]+$/,
                          message: "* Quantity needs to be at least 1",
                        },

                        onChange: (e) => handleItemFieldsChange(index, e),
                      })}
                    />
                  </div>
                  <div className="w-28">
                    <label className="p-color">Price</label>
                    <input
                      type="number"
                      className={`border h-12 mt-2 w-full px-3 focus:outline-none focus:border-purple-500 rounded-lg ${
                        errors.price ? "border-red-500" : ""
                      }`}
                      name="price"
                      min="1"
                      value={input.price}
                      {...register("price", {
                        required: "This field cannot be empty",

                        onChange: (e) => handleItemFieldsChange(index, e),
                      })}
                    />
                    {console.log()}
                  </div>
                  <div className="w-28">
                    <label className="p-color">Total</label>
                    <input
                      type="number"
                      disabled
                      className="border h-12 mt-2 p-color w-full px-3 focus:outline-none focus:border-purple-500 rounded-lg"
                      name="total"
                      value={input.total}
                      onChange={(e) => handleItemFieldsChange(index, e)}
                    />
                  </div>
                  <div
                    className="w-4 mt-12"
                    onClick={() => removeItemField(index)}
                  >
                    <FaTrashAlt className="p-color cursor-pointer" />
                  </div>
                </div>
              );
            })}

            <button
              className="w-full add-item mt-5 mb-10 dark-bg px-4 pl-3 py-3 rounded-3xl font-bold  cursor-pointer"
              onClick={(e) => addFields(e)}
            >
              + Add New Item
            </button>
            <div className="text-red-500">
              {itemListNumber
                ? "* Please add at least one item to your list"
                : "dada"}
            </div>
            <div className="invoice-top-info bg-white rounded-xl my-8 flex flex-col justify-between lg:flex lg:flex-row">
              <div className="invoice-status flex items-center justify-between lg:justify-start">
                <button
                  className="edit-invoice px-4 pl-3 py-3 rounded-3xl font-bold flex items-center cursor-pointer"
                  onClick={(e) => handleDiscard(e)}
                >
                  Discard
                </button>
              </div>
              <div className="invoice-top-buttons flex items-center mt-5 justify-between lg:mt-0">
                <button
                  className="lg:ml-5 ml-0 dark-bg p-color px-4 py-3 rounded-3xl font-bold flex items-center cursor-pointer"
                  type="submit"
                  name="draft"
                >
                  Save As Draft
                </button>
                <button
                  className="lg:ml-5 ml-0 add-invoice px-4 pl-3 py-3 rounded-3xl font-bold flex items-center cursor-pointer"
                  type="submit"
                  name="save"
                >
                  Save & Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default InvoiceForm;
