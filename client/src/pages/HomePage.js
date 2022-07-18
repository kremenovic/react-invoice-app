import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container section">
      <Link to="/invoices">Invoices</Link>
    </div>
  );
};

export default HomePage;
