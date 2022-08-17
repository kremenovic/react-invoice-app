const form_reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM_FIELD":
      let newField = [
        ...state.itemListFields,
        { itemName: "", quantity: 0, price: 0, total: 0 },
      ];
      return { ...state, itemListFields: newField };

    case "ITEM_FIELD":
      let data = [...state.itemListFields];

      data[action.payload.index][action.payload.e.target.name] =
        action.payload.e.target.value;

      data[action.payload.index].total =
        data[action.payload.index].quantity * data[action.payload.index].price;

      data[action.payload.index].total =
        data[action.payload.index].total.toFixed(2);

      return { ...state, itemListFields: data };

    case "REMOVE_ITEM_FIELD":
      let removeData = [...state.itemListFields];
      removeData.splice(action.payload, 1);
      return { ...state, itemListFields: removeData };

    case "BILL_TO_FIELD":
      let billToData = [...state.billToFields];
      billToData[0][action.field] = action.payload;
      return { ...state, billToFields: billToData };

    case "BILL_FROM_FIELD":
      let billFromData = [...state.billFromFields];
      billFromData[0][action.field] = action.payload;
      return { ...state, billFromFields: billFromData };

    case "CHANGE_PROJECT_DESCRIPTION":
      console.log(action.payload);
      return { ...state, projectDescription: action.payload };

    case "CHANGE_ISSUE_DATE":
      return { ...state, issueDate: action.payload };

    case "CHANGE_PAYMENT_DUE":
      let dateCopy = new Date(state.issueDate.getTime());
      dateCopy = dateCopy.setDate(dateCopy.getDate() + state.paymentTerms);
      return { ...state, paymentDue: dateCopy };

    case "CHANGE_PAYMENT_TERMS":
      return { ...state, paymentTerms: action.payload };

    case "SAVE_DRAFT_BTN":
      state.status = "draft";
      return { ...state };

    case "SAVE_SEND_BTN":
      state.status = "pending";
      return { ...state };
    default:
      throw new Error("no matching action type");
  }
};

export default form_reducer;
