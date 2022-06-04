import React, { useState } from "react";
import CountriesData from "./CountriesData";
import CountryData from "./CountryData";

const ShowButton = ({ country }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  if (show === false) {
    return <button onClick={handleShow}>Show</button>;
  } else {
    return (
      <div>
        <button onClick={handleShow}>Hide</button>
        <CountryData country={country} />
      </div>
    );
  }
};

export default ShowButton;
