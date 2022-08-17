import React, { useContext, useReducer, useRef, useState } from "react";
import form_reducer from "../reducers/form_reducer";

const FormContext = React.createContext();

const initialState = {
  billToFields: [
    {
      billToStreetAddress: "",
      billToCity: "",
      billToPostCode: "",
      billToCountry: "",
    },
  ],
  billFromFields: [
    {
      billFromClientName: "",
      billFromClientEmail: "",
      billFromStreetAddress: "",
      billFromCity: "",
      billbillFromCode: "",
      billFromCountry: "",
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
  const selectRef = useRef("");

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

  const handleSaveDraft = (e) => {
    e.preventDefault();
    dispatch({ type: "SAVE_DRAFT_BTN" });
  };

  const handleSaveSend = (e) => {
    e.preventDefault();
    dispatch({ type: "SAVE_SEND_BTN" });
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
