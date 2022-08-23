const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

// User
const user_model = new Schema({
  name: { type: String, required: "Name is required", unique: false },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    unique: [true, "Email Exist"],
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
});

// Invoice
const invoice_model = new Schema({
  user: { type: String, default: "stefan" },
  id: { type: String, default: "XZ2134" },
  status: { type: String, default: "" },
  paymentTerms: { type: String, default: "" },
  paymentDue: { type: String, default: "" },
  issueDate: { type: Date, default: "" },
  itemListFields: { type: [] },
  projectDescription: { type: String, default: "" },
  billFromFields: {
    type: [
      {
        billFromClientName: String,
        billFromClientEmail: String,
        billFromStreetAddress: String,
        billFromCity: String,
        billFromCode: String,
        billFromCountry: String,
      },
    ],
  },
  billToFields: {
    type: [
      {
        billToStreetAddress: String,
        billToCity: String,
        billToPostCode: String,
        billToCountry: String,
      },
    ],
  },
});

const Users = mongoose.model("users", user_model);
const Invoices = mongoose.model("invoices", invoice_model);

exports.default = Invoices;
module.exports = {
  Invoices,
  Users,
};