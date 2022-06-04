import React from "react";
import CountryData from "./CountryData";

const CountriesData = ({ filteredCountries }) => {
  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return <CountryData country={country} />;
  }

  if (filteredCountries.length > 10) {
    return <p>Too many matches, please narrow your search</p>;
  }

  return filteredCountries.map((country) => {
    return (
      <div>
        <li key={country.name.official} style={{ listStyleType: "none" }}>
          {country.name.common}
        </li>
      </div>
    );
  });
};

export default CountriesData;
