const model = require("../models/model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const e = require("express");

/*** AUTHENTICATION/AUTHORIZATION  ***/

// post /api/register
async function create_User(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let { registerName, registerEmail, registerPassword } = req.body;

  model.Users.findOne({ email: registerEmail }).then((user) => {
    if (user) {
      res.status(401).json({ err: "User with that email already exists." });
    } else {
      bcrypt.hash(registerPassword, 10).then((hash) => {
        const create = new model.Users({
          name: registerName,
          email: registerEmail,
          password: hash,
        });

        create.save(function (err) {
          if (!err) return res.json(create);
          return res.status(400).json({ message: `${err}` });
        });
      });
    }
  });
}

// post /api/login
async function login_User(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let { loginEmail, loginPassword } = req.body;

  model.Users.findOne({ email: loginEmail })
    .then((user) => {
      bcrypt
        .compare(loginPassword, user.password)
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

// get /api/user
async function get_User(req, res) {
  try {
    //   get the token from the authorization header
    const token = await req.headers.authorization.split(" ")[1];

    //check if the token matches the supposed origin
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");

    // retrieve the user details of the logged in user
    const user = await decodedToken;

    // pass the user down to the endpoints here
    req.user = user;

    let data = await model.Users.find({ email: req.user.email });
    let filter = await data.map((v) =>
      Object.assign({}, { name: v.name, email: v.email })
    );

    return res.json(filter);
  } catch (error) {
    res.status(401).json({
      error: "Invalid request!",
    });
  }
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
    const userName = await decodedToken;

    // pass the user down to the endpoints here
    req.user = userName;

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
      user,
      total,
    } = req.body;

    const create = await new model.Invoices({
      id,
      user,
      total,
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

    let data = await model.Invoices.find({ user: req.user.email });
    return res.json(data);
  } catch (error) {
    res.status(401).json({
      error: "Invalid request!",
    });
  }
}

// get /api/invoices/:id
async function get_SingleInvoice(req, res) {
  try {
    //   get the token from the authorization header
    const token = await req.headers.authorization.split(" ")[1];

    //check if the token matches the supposed origin
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");

    // retrieve the user details of the logged in user
    const user = await decodedToken;

    // pass the user down to the endpoints here
    req.user = user;

    let ID = req.params.id;

    let data = await model.Invoices.find({ id: ID });

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

    await model.Invoices.findByIdAndDelete(req.body._id, function (err) {
      if (!err) return res.json("Record Deleted");
    })
      .clone()
      .catch(function (err) {
        return res.json("Error While Deleting Invoice");
      });
  } catch (error) {
    res.status(401).json({
      error: "Invalid request!",
    });
  }
}

// update status only /api/invoice

async function update_Status(req, res) {
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
    await model.Invoices.findByIdAndUpdate(
      req.body.data._id,
      { status: req.body.data.status },
      function (err) {
        if (!err) {
          return res.json("Record Updated");
        }
      }
    )
      .clone()
      .catch(function (err) {
        return res.json("Error While Updating Invoice Status");
      });
  } catch (error) {
    res.status(401).json({
      error: "Invalid request!",
    });
  }
}

// edit invoice /api/invoices

async function update_Invoice(req, res) {
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
    await model.Invoices.findByIdAndUpdate(
      req.body.data._id,
      {
        status: req.body.data.state.status,
        total: req.body.data.state.total,
        projectDescription: req.body.data.state.projectDescription,
        itemListFields: req.body.data.state.itemListFields,
        issueDate: req.body.data.state.issueDate,
        paymentDue: req.body.data.state.paymentDue,
        paymentTerms: req.body.data.state.paymentTerms,
        billToFields: req.body.data.state.billToFields,
        billFromFields: req.body.data.state.billFromFields,
      },

      function (err) {
        if (!err) {
          return res.json("Record Updated");
        }
      }
    )
      .clone()
      .catch(function (err) {
        return res.json("Error While Updating Invoice");
      });
  } catch (error) {
    res.status(401).json({
      error: "Invalid request!",
    });
  }
}

module.exports = {
  create_Invoices,
  get_Invoice,
  delete_Invoice,
  get_SingleInvoice,
  create_User,
  login_User,
  get_User,
  update_Status,
  update_Invoice,
};
