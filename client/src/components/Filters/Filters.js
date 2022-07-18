import React from "react";
import { useMediaQuery } from "react-responsive";

import { IoIosArrowDown } from "react-icons/io";

const Filters = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="filters ">
      <p className="flex items-center">
        {!isMobile ? "Filter by status" : "Filter"} <IoIosArrowDown />
      </p>
      <div className="filter-options flex flex-col absolute bg-white">
        <div className="filter-option">
          <input type="checkbox" name="draft" id="draft" />
          <label htmlFor="draft"> Draft</label>
        </div>
        <div className="filter-option">
          <input type="checkbox" name="pending" id="pending" />
          <label htmlFor="pending"> Pending</label>
        </div>
        <div className="filter-option">
          <input type="checkbox" name="paid" id="paid" />
          <label htmlFor="paid"> Paid</label>
        </div>
      </div>
    </div>
  );
};

export default Filters;
