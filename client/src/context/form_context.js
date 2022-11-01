import React, { useContext, useReducer, useRef, useState } from "react";
import form_reducer from "../reducers/form_reducer";
import { useUserContext } from "./user_context";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const FormContext = React.createContext();

const initialState = {
  id: "",
  user: "",
  total: "",
  billFromFields: [
    {
      billFromStreetAddress: "",
      billFromCity: "",
      billFromPostCode: "",
      billFromCountry: "",
    },
  ],
  billToFields: [
    {
      billToClientName: "",
      billToClientEmail: "",
      billToStreetAddress: "",
      billToCity: "",
      billToCode: "",
      billToCountry: "",
    },
  ],
  projectDescription: "",
  itemListFields: [],
  issueDate: new Date(),
  paymentDue: "",
  paymentTerms: "",
  status: "",
};

const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(form_reducer, initialState);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [itemListNumber, setItemListNumber] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editID, setEditID] = useState();
  const selectRef = useRef("");
  const { userEmail } = useUserContext();

  const addFields = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_ITEM_FIELD" });
  };

  const handleItemFieldsChange = (index, e) => {
    dispatch({ type: "ITEM_FIELD", payload: { e, index } });
  };

  const removeItemField = (index) => {
    dispatch({ type: "REMOVE_ITEM_FIELD", payload: index });
  };

  const handleFromTextChange = (e) => {
    dispatch({
      type: "BILL_FROM_FIELD",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const handleToTextChange = (e) => {
    dispatch({
      type: "BILL_TO_FIELD",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const handleProjectDescription = (e) => {
    dispatch({ type: "CHANGE_PROJECT_DESCRIPTION", payload: e.target.value });
  };

  const handleChangeDate = (date) => {
    setShowCalendar(false);
    dispatch({ type: "CHANGE_ISSUE_DATE", payload: date });
  };

  const handleShowCalendar = () => {
    setShowCalendar(true);
  };

  const handlePaymentDue = () => {
    dispatch({ type: "CHANGE_PAYMENT_DUE" });
  };

  const handlePaymentTermsChange = () => {
    let paymentTerm = Number(selectRef.current.value);
    dispatch({ type: "CHANGE_PAYMENT_TERMS", payload: paymentTerm });
  };

  const handleDiscard = (e) => {
    e.preventDefault();
    setShowForm(false);
    setIsEdit(false);
    dispatch({ type: "DISCARD_BTN" });
  };

  const handleSaveDraft = (e) => {
    // e.preventDefault();
    setShowForm(false);
    const id = randomID();
    dispatch({ type: "SAVE_DRAFT_BTN", payload: { id, token, userEmail } });
  };

  const handleSaveSend = (e) => {
    // e.preventDefault();
    setShowForm(false);
    const id = randomID();
    dispatch({ type: "SAVE_SEND_BTN", payload: { id, token, userEmail } });
  };

  const handleUpdate = (e) => {
    setShowForm(false);
    setIsEdit(false);
    dispatch({
      type: "SAVE_UPDATE_INVOICE",
      payload: { token, userEmail, editID },
    });
  };

  const newInvoice = () => {
    setShowForm(true);
    setItemListNumber(false);
    dispatch({ type: "NEW_INVOICE" });
  };

  const updateInvoice = (data, e) => {
    setShowForm(true);
    selectRef.current.value = data.paymentTerms;
    setIsEdit(true);
    setEditID(e.target.dataset.id);
    dispatch({ type: "SET_UPDATE_INVOICE", payload: { data } });
  };

  const token = cookies.get("TOKEN");

  // generate random invoice ID
  const randomID = () => {
    let randomLetters = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 2)
      .toUpperCase();
    let randomNumbers = Math.floor(1000 + Math.random() * 9000);
    let generatedID = randomLetters + randomNumbers;
    return generatedID;
  };

  return (
    <FormContext.Provider
      value={{
        ...state,
        addFields,
        handleItemFieldsChange,
        removeItemField,
        handleSaveSend,
        handleFromTextChange,
        handleToTextChange,
        selectRef,
        showCalendar,
        handleChangeDate,
        handleShowCalendar,
        handlePaymentDue,
        handlePaymentTermsChange,
        handleProjectDescription,
        handleSaveDraft,
        setShowForm,
        showForm,
        newInvoice,
        handleDiscard,
        setItemListNumber,
        itemListNumber,
        updateInvoice,
        isEdit,
        setIsEdit,
        handleUpdate,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
// make sure use
export const useFormContext = () => {
  return useContext(FormContext);
};

export { FormContext, FormProvider };
