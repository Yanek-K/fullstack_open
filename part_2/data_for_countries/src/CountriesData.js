import React from "react";
import CountryData from "./CountryData";

const CountriesData = ({ filterCountries }) => {
  return (
    <div>
      {filterCountries && filterCountries.length > 1 ? (
        <ul>
          {filterCountries.map((country) => (
            <li key={country.name.official}>{country.name.common}</li>
          ))}
        </ul>
      ) : (
        <CountryData filterCountries={filterCountries} />
      )}
    </div>
  );
};

export default CountriesData;
