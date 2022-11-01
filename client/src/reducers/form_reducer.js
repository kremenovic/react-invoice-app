import Axios from "axios";

const form_reducer = (state, action) => {
  const URL = process.env.REACT_APP_API_URL;
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
      return { ...state, projectDescription: action.payload };

    case "CHANGE_ISSUE_DATE":
      return { ...state, issueDate: action.payload };

    case "CHANGE_PAYMENT_DUE":
      let dateCopy = new Date(state.issueDate.getTime());
      dateCopy = dateCopy.setDate(dateCopy.getDate() + state.paymentTerms);
      return { ...state, paymentDue: dateCopy };

    case "CHANGE_PAYMENT_TERMS":
      return { ...state, paymentTerms: action.payload };

    case "DISCARD_BTN":
      return {
        ...state,
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

    case "SAVE_DRAFT_BTN":
      state.status = "draft";
      state.id = action.payload.id;
      state.user = action.payload.userEmail;

      let totalSum = state.itemListFields.reduce((a, b) => {
        return parseFloat(a) + parseFloat(b.total);
      }, 0);

      // state.total = totalSum.toFixed(2);
      if (state.itemListFields.length > 1) {
        state.total = parseFloat(totalSum.toFixed(2));
      } else if (state.itemListFields.length === 1) {
        state.total = parseFloat(state.itemListFields[0].total);
      }

      Axios.post(`${URL}invoices`, state, {
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      });
      return state;

    case "SAVE_SEND_BTN":
      state.status = "pending";
      state.id = action.payload.id;
      state.user = action.payload.userEmail;
      let totalSumSend = state.itemListFields.reduce((a, b) => {
        return parseFloat(a) + parseFloat(b.total);
      }, 0);

      if (state.itemListFields.length > 1) {
        state.total = parseFloat(totalSumSend.toFixed(2));
      } else if (state.itemListFields.length === 1) {
        state.total = parseFloat(state.itemListFields[0].total);
      }

      Axios.post(`${URL}invoices`, state, {
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      });
      return { ...state };

    case "SAVE_UPDATE_INVOICE":
      state.status = "pending";
      let totalSumUpdate = state.itemListFields.reduce((a, b) => {
        return parseFloat(a) + parseFloat(b.total);
      }, 0);

      if (state.itemListFields.length > 1) {
        state.total = parseFloat(totalSumUpdate.toFixed(2));
      } else if (state.itemListFields.length === 1) {
        state.total = parseFloat(state.itemListFields[0].total);
      }
      Axios.put(
        `${URL}invoices/${state.id}`,
        { data: { _id: action.payload.editID, state } },
        { headers: { Authorization: `Bearer ${action.payload.token}` } }
      );
      return { ...state };

    case "SET_UPDATE_INVOICE":
      return {
        ...state,
        id: action.payload.data.id,
        user: action.payload.data.user,
        billFromFields: [
          {
            billFromStreetAddress:
              action.payload.data.billFromFields[0].billFromStreetAddress,
            billFromCity: action.payload.data.billFromFields[0].billFromCity,
            billFromPostCode:
              action.payload.data.billFromFields[0].billFromPostCode,
            billFromCountry:
              action.payload.data.billFromFields[0].billFromCountry,
          },
        ],
        billToFields: [
          {
            billToClientName:
              action.payload.data.billToFields[0].billToClientName,
            billToClientEmail:
              action.payload.data.billToFields[0].billToClientEmail,
            billToStreetAddress:
              action.payload.data.billToFields[0].billToStreetAddress,
            billToCity: action.payload.data.billToFields[0].billToCity,
            billToCode: action.payload.data.billToFields[0].billToCode,
            billToCountry: action.payload.data.billToFields[0].billToCountry,
          },
        ],
        projectDescription: action.payload.data.projectDescription,
        itemListFields: action.payload.data.itemListFields,
        issueDate: new Date(action.payload.data.issueDate),
        paymentTerms: action.payload.data.paymentTerms,
      };

    case "NEW_INVOICE":
      return {
        ...state,
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
    default:
      throw new Error("no matching action type");
  }
};

export default form_reducer;
