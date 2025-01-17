# Frontend Mentor - Invoice app solution

This is a solution to the [Invoice app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/invoice-app-i7KaLTQjl). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

<a href="https://kremenovic-invoice.netlify.app/"><img src="https://i.imgur.com/k4H7PjA.jpg"/></a>

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Installation](#installation)

## Overview

Full Stack React invoice application project was the last project on my list when it comes to learning React using frontendmentor.io.

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete invoices
- Receive form validations when trying to create/edit an invoice
- Save draft invoices, and mark pending invoices as paid
- Filter invoices by status (draft/pending/paid)
- Toggle light and dark mode
- **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)

<strong>Note:</strong> PDF option has been added

### Screenshot

<h4>Light Mode</h4>

<img src="https://i.imgur.com/julTNqv.png"/>

<h4>Dark Mode</h4>

<img src="https://i.imgur.com/HQQ18Cv.png"/>

### Links

- Solution URL: [frontendmentor.io](https://www.frontendmentor.io/solutions/full-stack-react-invoice-application-pSbJNGUwu-)
- Live Site URL: [kremenovic-invoice.netlify.app](https://kremenovic-invoice.netlify.app/)

### Built with

- [React](https://reactjs.org/)
- [NodeJS](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Tailwind](https://tailwindcss.com/)

### What I learned

Working on this project helped me to understand how useReducer hook works in React and how to work with ContextAPI. Before I started working on React Invoice App I didn't know how to work with NodeJS and how to create your own server and API. Initial idea was to create only frontend part but after a little I decided I'm gonna try NodeJS and MongoDB and to learn while working on a project.

### Useful resources

- [Tailwind](https://tailwindcss.com/docs/installation)
- [freeCodeCamp](https://www.freecodecamp.org/news/how-to-build-a-fullstack-authentication-system-with-react-express-mongodb-heroku-and-netlify/)

## Installation

<h4>React Frontend Part</h4>

Rename 'example_dot_env' file to '.env' file and update 'REACT_APP_API_URL' with your localhost URL.

### `cd client`

### `npm install`

This command installs a package and any packages that it depends on.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

<h4>NodeJS Backend Part</h4>

We need to create MongoDB Cluster and to connect it with our server.

- Log in to MongoDB
- Create Cluster
- Click 'Connect'
- Select 'Connect your application'
- Copy connection string
- Rename 'example_config_env' to '.env' and paste connection string to 'ATLAS_URI'
- Update `<password>`

<img src="https://i.imgur.com/QdwehUY.png"/>

In the database there will be 2 tables called 'invoices' and 'users'.

### `cd server`

### `npm install`

This command installs a package and any packages that it depends on.

### `npm start`

Open [http://localhost:8080/](http://localhost:8080/) to view it in the browser.

### API instructions

When it comes to accessing some API point like <i>[http://localhost:8080/api/invoices](http://localhost:8080/api/invoices) using Postman you will need to add token since it's protected. </i>

<h4>Inspect Element</h4>
<img src="https://i.imgur.com/SZU32IE.png"/>

<h4>Postman</h4>
<img src="https://i.imgur.com/EHIXKld.png"/>

### API Routes

```
http://localhost:8080/api/invoices
http://localhost:8080/api/invoices:id
http://localhost:8080/api/register
http://localhost:8080/api/login
http://localhost:8080/api/user
```

## Live Demo

<a href="https://kremenovic-invoice.netlify.app/">Click here to see live demo</a>
