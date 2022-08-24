const model = require("../models/model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("express");

/*** AUTHENTICATION/AUTHORIZATION  ***/

// post /api/register
async function create_User(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let { name, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    const create = new model.Users({
      name,
      email,
      password: hash,
    });

    create.save(function (err) {
      if (!err) return res.json(create);
      return res.status(400).json({ message: `${err}` });
    });
  });
}

// post /api/login
async function login_User(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let { email, password } = req.body;

  // let email = "stefan@kremenovic.com";
  // let password = "babab";

  model.Users.findOne({ email: email })
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return res.status(400).send({
              message: "Password does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              email: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          res.status(200).send({
            message: "Login Successful",
            user: user.email,
            token,
          });
        })
        .catch((error) => {
          res.status(400).send({
            message: "Password does not match",
            error,
          });
        });
    })
    .catch((e) => {
      res.status(404).send({
        message: "User not found",
        e,
      });
    });
}

/*** INVOICES ***/

// post /api/invoice
async function create_Invoices(req, res) {
  try {
    //   get the token from the authorization header
    const token = await req.headers.authorization.split(" ")[1];

    //check if the token matches the supposed origin
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");

    // retrieve the user details of the logged in user
    const user = await decodedToken;

    // pass the user down to the endpoints here
    req.user = user;

    if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
    let {
      id,
      projectDescription,
      itemListFields,
      issueDate,
      paymentDue,
      paymentTerms,
      status,
      billToFields,
      billFromFields,
    } = req.body;

    const create = await new model.Invoices({
      id,
      projectDescription,
      itemListFields,
      issueDate,
      paymentDue,
      paymentTerms,
      status,
      billToFields,
      billFromFields,
    });

    create.save(function (err) {
      if (!err) return res.json(create);
      return res
        .status(400)
        .json({ message: `Error while creating invoice ${err}` });
    });
  } catch (error) {
    res.status(401).json({
      error: "Invalid request!",
    });
  }
}

// get /api/invoice
async function get_Invoice(req, res) {
  try {
    //   get the token from the authorization header
    const token = await req.headers.authorization.split(" ")[1];

    //check if the token matches the supposed origin
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");

    // retrieve the user details of the logged in user
    const user = await decodedToken;

    // pass the user down to the endpoints here
    req.user = user;

    let data = await model.Invoices.find({});
    return res.json(data);
  } catch (error) {
    res.status(401).json({
      error: "Invalid request!",
    });
  }
}

// delete /api/invoice
async function delete_Invoice(req, res) {
  try {
    //   get the token from the authorization header
    const token = await req.headers.authorization.split(" ")[1];

    //check if the token matches the supposed origin
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");

    // retrieve the user details of the logged in user
    const user = await decodedToken;

    // pass the user down to the endpoints here
    req.user = user;

    if (!req.body)
      return res.status(400).json({ message: `Request Body Not Found` });
    await model.Invoices.deleteOne(req.body, function (err) {
      if (!err) return res.json("Record Deleted");
    })
      .clone()
      .catch(function (err) {
        return res.json("Error While Deleting Transaction");
      });
  } catch (error) {
    res.status(401).json({
      error: "Invalid request!",
    });
  }
}

//get

module.exports = {
  create_Invoices,
  get_Invoice,
  delete_Invoice,
  create_User,
  login_User,
};
