import React from "react";

const FindContact = ({ searchName, handleSearchName }) => {
  return (
    <div>
      <h3>
        Search for a Name{" "}
        <input value={searchName} onChange={handleSearchName}></input>
      </h3>
    </div>
  );
};

export default FindContact;
