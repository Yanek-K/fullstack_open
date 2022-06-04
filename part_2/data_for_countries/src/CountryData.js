import React from "react";

const CountryData = ({ country }) => {
  let languages = Object.values(country.languages);
  console.log(country.flag);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital : {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Flag" />
    </div>
  );
};

export default CountryData;
