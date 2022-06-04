let Search = (data, inputCountry) => {
  let filteredCountries = data.filter(
    (country) => country.name.common.includes(inputCountry) === true
  );
  return filteredCountries;
};

export default Search;
